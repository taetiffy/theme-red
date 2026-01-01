"use client"

import { useEffect, useState, useCallback, useRef } from 'react';
import { useWebSocket } from './useWebSocket';

export enum PresenceStatus {
    ONLINE = 'online',
    AWAY = 'away',
    BUSY = 'busy',
    OFFLINE = 'offline',
}

export enum PresenceActivityType {
    IDLE = 'idle', // ไม่มีกิจกรรม
    TYPING = 'typing', // กำลังพิมพ์ข้อความ
    EDITING = 'editing', // กำลังแก้ไขเอกสาร
    VIEWING = 'viewing', // กำลังดูหน้าใดหน้าหนึ่ง
    PLAYING = 'playing', // กำลังเล่นเกม
    PROCESSING = 'processing', // กำลังดำเนินการธุรกรรมการเงิน
}

export interface PresenceActivity {
    type: PresenceActivityType;
    target_id?: string; // ในห้องไหน หรือแชทกับใคร [TYPING]
    document_id?: string; // ID ของเอกสาร [EDITING]
    page?: string; // URL หรือ path ของหน้า [VIEWING]
    name?: string; // ชื่อเกม [PLAYING]
    transaction_id?: string; // รหัสธุรกรรม หรือรายละเอียดเพิ่มเติม [PROCESSING]
}

export interface UserPresence {
    user_id: string;
    host: string,
    role: string,
    username: string;
    status: PresenceStatus;
    activity: PresenceActivity;
    metadata?: Record<string, string>;
}

// Scope options สำหรับ subscribe
export type PresenceSubscribeScope =
    | { scope: 'users_in_host'; host: string; user_ids: string[] }
    | { scope: 'users_in_my_host'; user_ids: string[] }
    | { scope: 'all_in_host'; host: string }
    | { scope: 'all_in_my_host' }
    | { scope: 'all' };

export interface UsePresenceOptions {
    /** Scope การ subscribe */
    subscribeScope?: PresenceSubscribeScope;
    /** Auto-detect away (ไม่มีการเคลื่อนไหว) */
    autoAway?: boolean;
    /** เวลา (ms) ที่จะเปลี่ยนเป็น away */
    awayTimeout?: number;
}

export const usePresence = (options: UsePresenceOptions = {}) => {
    const {
        subscribeScope,
        autoAway = true,
        awayTimeout = 1000 * 30 // 30 วินาที
    } = options;

    const { send, subscribe, isAuthenticated } = useWebSocket();

    // เก็บ presence โดยใช้ composite key "userId"
    const [presences, setPresences] = useState<Map<string, UserPresence>>(new Map());
    const [myStatus, setMyStatus] = useState<PresenceStatus>(PresenceStatus.ONLINE);
    const [myActivity, setMyActivity] = useState<PresenceActivity>({ type: PresenceActivityType.IDLE });

    const awayTimerRef = useRef<NodeJS.Timeout | null>(null);
    const lastActivityRef = useRef<number>(Date.now());
    const hasRealActivityRef = useRef(false);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    const makeKey = (host: string, userId: string): string => {
        return `${host}:${userId}`;
    };

    // ส่ง presence update ไปยัง server
    const updatePresence = useCallback((
        status: PresenceStatus,
        activity: PresenceActivity,
        metadata?: Record<string, string>
    ) => {
        if (!isAuthenticated) return;

        // แปลง activity เป็น externally tagged
        let activityPayload: any;
        switch (activity.type) {
            case PresenceActivityType.TYPING:
                activityPayload = { typing: { target_id: activity.target_id } };
                break;
            case PresenceActivityType.EDITING:
                activityPayload = { editing: { document_id: activity.document_id } };
                break;
            case PresenceActivityType.VIEWING:
                activityPayload = { viewing: { page: activity.page } };
                break;
            case PresenceActivityType.PLAYING:
                activityPayload = { playing: { name: activity.name } };
                break;
            case PresenceActivityType.PROCESSING:
                activityPayload = { processing: { transaction_id: activity.transaction_id } };
                break;
            case PresenceActivityType.IDLE:
            default:
                activityPayload = { idle: null };
                break;
        }

        send({
            type: 'presence_update',
            status,
            activity: activityPayload,
            metadata,
        });

        setMyStatus(status);
        setMyActivity(activity);
    }, [isAuthenticated, send]);

    // Reset away timer
    const resetAwayTimer = useCallback(() => {
        lastActivityRef.current = Date.now();

        if (myStatus === PresenceStatus.AWAY) {
            // updatePresence(PresenceStatus.ONLINE, myActivity);
            return;
        }

        if (awayTimerRef.current) {
            clearTimeout(awayTimerRef.current);
        }

        if (autoAway) {
            awayTimerRef.current = setTimeout(() => {
                if (myStatus !== PresenceStatus.BUSY) {
                    updatePresence(PresenceStatus.AWAY, myActivity);
                }
            }, awayTimeout);
        }
    }, [autoAway, awayTimeout, myStatus, myActivity, updatePresence]);

    // ตั้งค่าสถานะ
    const setStatus = useCallback((status: PresenceStatus) => {
        updatePresence(status, myActivity);
    }, [myActivity, updatePresence]);

    // ตั้งค่ากิจกรรม
    const setActivity = useCallback((activity: PresenceActivity) => {
        updatePresence(myStatus, activity);
    }, [myStatus, updatePresence]);

    // กำลังพิมพ์
    const startTyping = useCallback((targetId: string) => {
        setActivity({
            type: PresenceActivityType.TYPING,
            target_id: targetId,
        });
    }, [setActivity]);

    // หยุดพิมพ์
    const stopTyping = useCallback(() => {
        setActivity({ type: PresenceActivityType.IDLE });
    }, [setActivity]);

    // กำลังแก้ไข
    const startEditing = useCallback((documentId: string) => {
        setActivity({
            type: PresenceActivityType.EDITING,
            document_id: documentId,
        });
    }, [setActivity]);

    // กำลังดูหน้า
    const viewPage = useCallback((page: string) => {
        setActivity({
            type: PresenceActivityType.VIEWING,
            page,
        });
    }, [setActivity]);

    // Subscribe ตาม scope
    const subscribeToPresence = useCallback((scope: PresenceSubscribeScope) => {
        if (!isAuthenticated) return;

        send({
            type: 'presence_subscribe',
            ...scope,
        });
    }, [isAuthenticated, send]);

    // Unsubscribe โดยใช้ composite key PresenceKey(host:userId) use makeKey function
    const unsubscribeFromPresence = useCallback((presenceKeys: string[]) => {
        if (!isAuthenticated || presenceKeys.length === 0) return;

        send({
            type: 'presence_unsubscribe',
            presence_keys: presenceKeys,
        });
    }, [isAuthenticated, send]);

    // Listen to WebSocket messages
    useEffect(() => {
        const unsubscribe = subscribe((message) => {
            if (message.type === 'presence_changed') {
                const { user_id, status, host, role, username, activity: rawActivity, metadata } = message;

                // แปลง activity จาก externally tagged → PresenceActivity
                let activity: PresenceActivity = { type: PresenceActivityType.IDLE };

                if (rawActivity) {
                    if ('idle' === rawActivity) {
                        activity = { type: PresenceActivityType.IDLE };
                    } else if ('typing' in rawActivity) {
                        activity = { type: PresenceActivityType.TYPING, target_id: rawActivity.typing.target_id };
                    } else if ('editing' in rawActivity) {
                        activity = { type: PresenceActivityType.EDITING, document_id: rawActivity.editing.document_id };
                    } else if ('viewing' in rawActivity) {
                        activity = { type: PresenceActivityType.VIEWING, page: rawActivity.viewing.page };
                    } else if ('playing' in rawActivity) {
                        activity = { type: PresenceActivityType.PLAYING, name: rawActivity.playing.name };
                    } else if ('processing' in rawActivity) {
                        activity = { type: PresenceActivityType.PROCESSING, transaction_id: rawActivity.processing.transaction_id };
                    }
                }

                setPresences(prev => {
                    const next = new Map(prev);
                    next.set(user_id, { user_id, host, role, username, status, activity, metadata });
                    return next;
                });
            } else if (message.type === 'presence_snapshot') {
                const { presences: presenceList } = message;

                setPresences(prev => {
                    const next = new Map(prev);
                    presenceList.forEach((p: any) => {
                        // แปลง activity เช่นกัน
                        let activity: PresenceActivity = { type: PresenceActivityType.IDLE };
                        if (p.activity) {
                            if ('idle' === p.activity) {
                                activity = { type: PresenceActivityType.IDLE };
                            } else if ('typing' in p.activity) {
                                activity = { type: PresenceActivityType.TYPING, target_id: p.activity.typing.target_id };
                            } else if ('editing' in p.activity) {
                                activity = { type: PresenceActivityType.EDITING, document_id: p.activity.editing.document_id };
                            } else if ('viewing' in p.activity) {
                                activity = { type: PresenceActivityType.VIEWING, page: p.activity.viewing.page };
                            } else if ('playing' in p.activity) {
                                activity = { type: PresenceActivityType.PLAYING, name: p.activity.playing.name };
                            } else if ('processing' in p.activity) {
                                activity = { type: PresenceActivityType.PROCESSING, transaction_id: p.activity.processing.transaction_id };
                            }
                        }

                        next.set(p.user_id, {
                            user_id: p.user_id,
                            host: p.host,
                            role: p.role,
                            username: p.username,
                            status: p.status,
                            activity,
                            metadata: p.metadata,
                        });
                    });
                    return next;
                });
            }
        });

        return unsubscribe;
    }, [subscribe]);

    // Subscribe ตาม scope ที่กำหนด
    useEffect(() => {
        if (subscribeScope && isAuthenticated) {
            subscribeToPresence(subscribeScope);
        }
    }, [subscribeScope, isAuthenticated]);

    // Auto-detect activity (สำคัญ: แยก light / important events)
    useEffect(() => {
        if (!autoAway) return;

        const importantEvents = ['keydown', 'click', 'scroll', 'touchstart']; // เหตุการณ์ "จริง"
        const lightEvents = ['mousemove', 'mousedown']; // ขยับเมาส์อย่าง่า ๆ

        const markRealActivity = () => {
            hasRealActivityRef.current = true;
            if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
            debounceTimerRef.current = setTimeout(() => {
                hasRealActivityRef.current = false;
            }, 500);
        };

        const handleImportant = () => {
            markRealActivity();
            resetAwayTimer();
        };

        const handleLight = () => {
            if (hasRealActivityRef.current) {
                resetAwayTimer();
            }
        };

        importantEvents.forEach(ev =>
            document.addEventListener(ev, handleImportant, { passive: true })
        );
        lightEvents.forEach(ev =>
            document.addEventListener(ev, handleLight, { passive: true })
        );

        resetAwayTimer();

        return () => {
            importantEvents.forEach(ev => document.removeEventListener(ev, handleImportant));
            lightEvents.forEach(ev => document.removeEventListener(ev, handleLight));
            if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
            if (awayTimerRef.current) clearTimeout(awayTimerRef.current);
        };
    }, [autoAway, resetAwayTimer]);

    // ตรวจจับการกลับมาจาก AWAY → ONLINE
    useEffect(() => {
        if (!autoAway || myStatus !== PresenceStatus.AWAY) return;

        const importantEvents = ['keydown', 'click', 'scroll', 'touchstart'];

        const handleUserReturn = () => {
            updatePresence(PresenceStatus.ONLINE, myActivity);
        };

        importantEvents.forEach(ev =>
            document.addEventListener(ev, handleUserReturn, { passive: true })
        );

        return () => {
            importantEvents.forEach(ev => document.removeEventListener(ev, handleUserReturn));
        };
    }, [autoAway, myStatus, myActivity, updatePresence]);

    // Set online when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            updatePresence(PresenceStatus.ONLINE, { type: PresenceActivityType.IDLE });
        }
    }, [isAuthenticated]);

    return {
        // State
        presences: Array.from(presences.values()),
        presencesMap: presences,
        myStatus,
        myActivity,

        // Actions
        setStatus,
        setActivity,
        startTyping,
        stopTyping,
        startEditing,
        viewPage,
        subscribeToPresence,
        unsubscribeFromPresence,

        // Helpers
        makeKey
    };
};