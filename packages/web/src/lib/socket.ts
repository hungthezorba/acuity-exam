import { io } from 'socket.io-client';



export const socket = io(import.meta.env.VITE_BASE_WSS_URL || 'ws://localhost:5000');