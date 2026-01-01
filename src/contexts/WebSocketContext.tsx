import { createContext } from 'react';

// WebSocket Events
export const WebSocketEvent = {
    TEST: "TEST",                                                  // สำหรับทดสอบ
    KILL: "KILL",                                                  // ดีดผู้ใช้ออกจากระบบถ้ามีการเข้าสู่ระบบซ้อน 
    NOTIFY: "NOTIFY",                                              // สำหรับการแจ้งเตือน
    UPDATE_MEMBER: "UPDATE_MEMBER",                                // อัพเดทข้อมูลต่างๆของผู้ใช้งาน (ACCESS_TOKEN, CREDIT, BONUS, GEM, RANK, ETC...)
    UPDATE_MEMBER_BALANCE: "UPDATE_MEMBER_BALANCE",                // อัพเดทเฉพาะยอดคงเหลือเครดิต
    UPDATE_MEMBER_GEM_BALANCE: "UPDATE_MEMBER_GEM_BALANCE",        // อัพเดทเฉพาะยอดคงเหลือเพชร
    UPDATE_MEMBER_INVENTORY: "UPDATE_MEMBER_INVENTORY",            // อัพเดทเฉพาะข้อมูลไอเทม
    UPDATE_MEMBER_BONUS: "UPDATE_MEMBER_BONUS",                    // อัพเดทเฉพาะข้อมูลโปรโมชั้นที่เกียวข้องของลูกค้า
    UPDATE_MEMBER_BONUS_BALANCE: "UPDATE_MEMBER_BONUS_BALANCE",    // อัพเดทเฉพาะยอดคงเหลือเครดิตโปรโมชั้น
    UPDATE_MEMBER_RANK: "UPDATE_MEMBER_RANK",                      // อัพเดทเฉพาะข้อมูล rank
    MEMBER_WITHDRAW: "MEMBER_WITHDRAW",                            // แจ้งเตือนไปยังแอดมินเมื่อผู้ใช้งานถอนเงิน
} as const;

export type WebSocketEventType = keyof typeof WebSocketEvent;

// Message Types
export type WebSocketMessage =
    | { type: 'auth_success' }
    | { type: 'auth_failed' }
    | { type: 'pong' }
    | { type: 'broadcast'; pattern: string; data?: any }
    | { type: 'direct'; pattern: string; data?: any }
    | { type: 'ping' }
    | { type: 'presence_changed'; user_id: string; host: string; role: string; username: string; status: any; activity: any; metadata: any }
    | { type: 'presence_snapshot'; presences: any };

// Context Type
export interface WebSocketContextType {
    isConnected: boolean;
    isAuthenticated: boolean;
    send: (message: any) => void; // ไม่ใช้นะ
    subscribe: (callback: (msg: WebSocketMessage) => void) => () => void;
}

// Context
const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);
export default WebSocketContext;