"use client"

import React, { useEffect, useRef, ReactNode, useState } from 'react';
import { getTokenFromCookie } from '@/utils/cookieUtils';
import { getHostname } from '@/utils/url/client';
import WebSocketContext, { WebSocketContextType, WebSocketMessage } from '@/contexts/WebSocketContext';
import { useMemberStore } from '@/stores/member';

// Provider
interface WebSocketProviderProps {
    children: ReactNode;
    serverUrl?: string;
    maxReconnectAttempts?: number;
    baseReconnectDelay?: number;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
    children,
    serverUrl = 'wss://micro-websocket.blackvalor888.com',
    maxReconnectAttempts = 5,
    baseReconnectDelay = 5000,
}) => {

    const { isAuthenticated } = useMemberStore();

    const wsRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isWSAuthenticated, setIsWSAuthenticated] = useState(false);
    const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectAttemptsRef = useRef(0);
    const listenersRef = useRef<((msg: WebSocketMessage) => void)[]>([]);

    // Subscribe to messages
    const subscribe = (callback: (msg: WebSocketMessage) => void) => {
        listenersRef.current.push(callback);
        return () => {
            listenersRef.current = listenersRef.current.filter(cb => cb !== callback);
        };
    };

    const broadcastMessage = (msg: WebSocketMessage) => {
        listenersRef.current.forEach(cb => cb(msg));
    };

    // Authenticate
    const authenticate = (token: string) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
                type: 'auth',
                token,
                host: getHostname()
            }));
        }
    };

    // Ping/Pong
    const sendPing = () => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));
        }
    };

    const startPing = () => {
        if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = setInterval(sendPing, 1000 * 10);
    };

    const stopPing = () => {
        if (pingIntervalRef.current) {
            clearInterval(pingIntervalRef.current);
            pingIntervalRef.current = null;
        }
    };

    // Send Message
    const send = (message: any) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(message));
        }
    };

    // Connect
    const connect = () => {
        const token = getTokenFromCookie();
        if (!token || wsRef.current?.readyState === WebSocket.OPEN) return;

        try {
            wsRef.current = new WebSocket(serverUrl);

            wsRef.current.onopen = () => {
                setIsConnected(true);
                authenticate(token);
            };

            wsRef.current.onmessage = (event: MessageEvent) => {
                try {
                    const message: WebSocketMessage = JSON.parse(event.data);
                    handleServerMessage(message);
                } catch (e) {
                    // Ignore parse errors
                }
            };

            wsRef.current.onclose = (event: CloseEvent) => {
                setIsConnected(false);
                setIsWSAuthenticated(false);
                stopPing();

                // Auto-reconnect with exponential backoff
                if (reconnectAttemptsRef.current < maxReconnectAttempts && (event.code === 1006 || event.code === 1005)) {
                    const delay = baseReconnectDelay * Math.pow(2, reconnectAttemptsRef.current);
                    setTimeout(() => {
                        if (!isConnected) {
                            reconnectAttemptsRef.current++;
                            connect();
                        }
                    }, delay);
                } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
                    console.error('Max reconnection attempts reached.');
                }
            };

            wsRef.current.onerror = () => {
                // Silent error
            };
        } catch (error) {
            console.error('WebSocket connection error:', error);
        }
    };

    // Handle Incoming Messages
    const handleServerMessage = (message: WebSocketMessage) => {
        switch (message.type) {
            case 'auth_success':
                setIsWSAuthenticated(true);
                startPing();
                reconnectAttemptsRef.current = 0;
                break;
            case 'auth_failed':
                setIsWSAuthenticated(false);
                break;
            case 'pong':
                break;
            default:
                break;
        }

        // Broadcast to all listeners
        broadcastMessage(message);
    };

    // Disconnect
    const disconnect = () => {
        if (wsRef.current) {
            stopPing();
            wsRef.current.close(1000, 'Client disconnect');
            wsRef.current = null;
        }
        setIsConnected(false);
        setIsWSAuthenticated(false);
        reconnectAttemptsRef.current = 0;
    };

    // Auto-connect on mount
    useEffect(() => {
        const timer = setTimeout(connect, 500);
        return () => {
            clearTimeout(timer);
            disconnect();
        };
    }, [serverUrl, isAuthenticated]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            disconnect();
        };
    }, []);

    const value: WebSocketContextType = {
        isConnected,
        isAuthenticated: isWSAuthenticated && isAuthenticated,
        send,
        subscribe,
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};