// "use client"

// import { InventoryType, useMemberStore } from '@/stores/member';
// import { getTokenFromCookie } from '@/utils/cookieUtils';
// import { useEffect, useRef } from 'react';
// import { toast } from 'sonner';
// import { getHostname } from '@/utils/url/client';
// import { useModal } from '@/hooks/useModal';

// export const WebSocketEvent = {
//     TEST: "TEST",                                                  // สำหรับทดสอบ
//     KILL: "KILL",                                                  // ดีดผู้ใช้ออกจากระบบถ้ามีการเข้าสู่ระบบซ้อน 
//     NOTIFY: "NOTIFY",                                              // สำหรับการแจ้งเตือน
//     UPDATE_MEMBER: "UPDATE_MEMBER",                                // อัพเดทข้อมูลต่างๆของผู้ใช้งาน (ACCESS_TOKEN, CREDIT, BONUS, GEM, RANK, ETC...)
//     UPDATE_MEMBER_BALANCE: "UPDATE_MEMBER_BALANCE",                // อัพเดทเฉพาะยอดคงเหลือเครดิต
//     UPDATE_MEMBER_GEM_BALANCE: "UPDATE_MEMBER_GEM_BALANCE",        // อัพเดทเฉพาะยอดคงเหลือเพชร
//     UPDATE_MEMBER_INVENTORY: "UPDATE_MEMBER_INVENTORY",            // อัพเดทเฉพาะข้อมูลไอเทม
//     UPDATE_MEMBER_BONUS: "UPDATE_MEMBER_BONUS",                    // อัพเดทเฉพาะข้อมูลโปรโมชั้นที่เกียวข้องของลูกค้า
//     UPDATE_MEMBER_BONUS_BALANCE: "UPDATE_MEMBER_BONUS_BALANCE",    // อัพเดทเฉพาะยอดคงเหลือเครดิตโปรโมชั้น
//     UPDATE_MEMBER_RANK: "UPDATE_MEMBER_RANK",                      // อัพเดทเฉพาะข้อมูล rank
//     MEMBER_WITHDRAW: "MEMBER_WITHDRAW",                            // แจ้งเตือนไปยังแอดมินเมื่อผู้ใช้งานถอนเงิน
// } as const;

// export default function WebSocketClient() {

//     //////////////////////////////////////////////////////
//     ///                 PROCESS SECTION                ///
//     //////////////////////////////////////////////////////

//     const { setMember, logout, setBalance, setInventory, setRank, isAuthenticated } = useMemberStore();
//     const { realtimeAlert } = useModal();

//     // อัพเดทข้อมูลแบบ Realtime Broadcast
//     function broadcastProcessing(data: {
//         type: string,
//         pattern: string,
//         data: any,
//         from: string | undefined
//     }) {
//         const onTest = (data: any) => toast.success(data);
//         switch (data.pattern) {
//             case WebSocketEvent.TEST:
//                 onTest(data.data);
//                 break;
//             default: break;
//         }
//     }

//     // อัพเดทข้อมูลแบบ Realtime Direct
//     function directProcessing(data: {
//         type: string,
//         pattern: string,
//         data: any,
//         from: string | undefined
//     }) {

//         const onNotify = (data: any) => {
//             toast.success(data?.detail);
//             if (data.type === "ADD_BALANCE") {
//                 // onOpen("CLOSE-MODAL-DUMMY");
//             }
//         };

//         // ฟังก์ชันที่ทำงานเมื่อได้รับการอัพเดทข้อมูลผู้ใช้
//         const onUpdateMember = (data: {
//             accessToken?: string;
//             member?: {
//                 username?: string;
//                 real_username?: string;
//                 phone?: string;
//                 text_password?: string;
//                 full_name?: string;
//                 bonus_status?: boolean;
//                 affiliateCode?: string;
//             },
//             balance?: {
//                 credit?: number;
//                 gem?: number;
//                 bonus?: number;
//                 returnLost?: number;
//             },
//             frame?: string;
//             rank?: {
//                 level?: number;
//                 exp?: number;
//                 progress?: number;
//                 total?: number;
//             },
//             inventory?: Array<InventoryType>,
//             bonus?: {
//                 id: string;
//                 status: boolean;
//                 memberId: string;
//                 turnover: number;
//                 checkinId: string | null;
//                 createdAt: Date;
//                 updatedAt: Date;
//                 bonusadmin: any;
//                 bonusadminId: string;
//                 currentBonus: number;
//                 totalBalance: number;
//                 accountBalance: number;
//             },
//             alert?: Array<{ type: "RANK_UP", name: string, level: number } | { type: "LEVEL_UP", level: number } | { type: "ITEM", name: string, image: string }>
//         }) => {
//             // ตรวจสอบว่า token ตรงกับที่มีอยู่หรือไม่
//             if (data.accessToken) {
//                 if (data.accessToken !== getTokenFromCookie()) {
//                     logout();
//                     return;
//                 }
//             }
//             if (data.member) setMember(data.member);
//             // if (data.frame) setFrame(data.frame);
//             if (data.rank) setRank(data.rank);
//             if (data.balance) setBalance(data.balance);
//             // if (data.bonus) setBonus(data.bonus);
//             if (data.inventory) {
//                 const final = [...data.inventory, ...Array(36 - data.inventory.length).fill(null)];
//                 setInventory(final);
//             }
//             if (data.alert && data.alert.length > 0) {
//                 for (const dx of data.alert) toast.success(dx.type === "RANK_UP" ? `ยินดีด้วยแรงค์คุณได้อัพเป็น ${dx.name}` : (dx.type === "LEVEL_UP" ? `ยินดีด้วยเลเวลอัพเป็น ${dx.level}` : (dx.type === "ITEM" ? `คุณได้รับไอเทม ${dx.name}` : "")));
//                 realtimeAlert.setData(data.alert);
//                 if (realtimeAlert.state.onOpen) realtimeAlert.state.onOpen();
//             }
//         };

//         switch (data.pattern) {
//             case WebSocketEvent.NOTIFY:
//                 onNotify(data.data);
//                 break;
//             case WebSocketEvent.UPDATE_MEMBER:
//                 onUpdateMember(data.data);
//                 break;
//             default: break;
//         }

//     }


//     //////////////////////////////////////////////////////
//     ///                  SOCKET SECTION                ///
//     //////////////////////////////////////////////////////

//     const wsRef = useRef<WebSocket | null>(null);
//     const isConnectedRef = useRef<boolean>(false);
//     const isAuthenticatedRef = useRef<boolean>(false);
//     const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
//     const reconnectAttemptsRef = useRef<number>(0);

//     // const serverUrl = 'ws://localhost:8080';
//     const serverUrl = 'wss://micro-websocket.blackvalor888.com';
//     const maxReconnectAttempts = 5;
//     const baseReconnectDelay = 5000;

//     const authenticate = (token: string) => {
//         if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
//             const authMessage = {
//                 type: 'auth',
//                 token,
//                 host: getHostname()
//             };
//             wsRef.current.send(JSON.stringify(authMessage));
//         }
//     };

//     const handleServerMessage = (message: any) => {
//         if (!message || !message.type) return;
//         switch (message.type) {
//             case 'auth_success':
//                 isAuthenticatedRef.current = true;
//                 startPing();
//                 reconnectAttemptsRef.current = 0;
//                 break;
//             case 'auth_failed':
//                 isAuthenticatedRef.current = false;
//                 break;
//             case 'pong': break;
//             case 'broadcast':
//                 broadcastProcessing(message);
//                 break;
//             case 'direct':
//                 directProcessing(message);
//                 break;
//             case 'error': break;
//             default: break;
//         }
//     };

//     const sendPing = () => {
//         if (wsRef.current && isAuthenticatedRef.current && wsRef.current.readyState === WebSocket.OPEN) {
//             const pingMessage = {
//                 type: 'ping',
//                 timestamp: Date.now(),
//             };
//             wsRef.current.send(JSON.stringify(pingMessage));
//         }
//     };

//     const startPing = () => {
//         if (pingIntervalRef.current) {
//             clearInterval(pingIntervalRef.current);
//         }
//         pingIntervalRef.current = setInterval(() => {
//             sendPing();
//         }, 3 * 1000);
//     };

//     const stopPing = () => {
//         if (pingIntervalRef.current) {
//             clearInterval(pingIntervalRef.current);
//             pingIntervalRef.current = null;
//         }
//     };

//     const connect = () => {
//         const token = getTokenFromCookie();
//         if (typeof token === "undefined" || token === null) return;
//         if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;
//         try {
//             wsRef.current = new WebSocket(serverUrl);
//             wsRef.current.onopen = () => {
//                 isConnectedRef.current = true;
//                 authenticate(token);
//             };
//             wsRef.current.onmessage = (event: MessageEvent) => {
//                 try {
//                     const message = JSON.parse(event.data);
//                     handleServerMessage(message);
//                 } catch (e) {
//                     // Ignore parsing errors
//                 }
//             };
//             wsRef.current.onclose = (event: CloseEvent) => {
//                 isConnectedRef.current = false;
//                 isAuthenticatedRef.current = false;
//                 stopPing();
//                 // Auto-reconnect logic with exponential backoff
//                 if (event.code === 1005 || event.code === 1006) {
//                     if (reconnectAttemptsRef.current < maxReconnectAttempts) {
//                         const delay = baseReconnectDelay * Math.pow(2, reconnectAttemptsRef.current);
//                         setTimeout(() => {
//                             if (!isConnectedRef.current) {
//                                 reconnectAttemptsRef.current++;
//                                 connect();
//                             }
//                         }, delay);
//                     } else {
//                         toast.error("เกิดปัญหาในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณารีเฟรชหน้าเว็บ");
//                     }
//                 }
//             };
//             wsRef.current.onerror = () => {
//                 // Ignore errors for simplicity
//             };
//         } catch (error) {
//             // Ignore connection errors
//         }
//     };

//     const disconnect = () => {
//         if (wsRef.current) {
//             stopPing();
//             wsRef.current.close(1000, 'User disconnected');
//             wsRef.current = null;
//             isConnectedRef.current = false;
//             isAuthenticatedRef.current = false;
//             reconnectAttemptsRef.current = 0;
//         }
//     };

//     useEffect(() => {
//         if (isAuthenticated) {
//             const timer = setTimeout(() => {
//                 connect();
//             }, 500);
//             return () => {
//                 clearTimeout(timer);
//                 disconnect();
//             };
//         } else {
//             disconnect();
//         }
//     }, [isAuthenticated]);

//     return null;

// }