import { io } from "socket.io-client";

export const socket = io("https://livedata.sweetghar.com", {
  transports: ["websocket"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});