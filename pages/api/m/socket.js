import { Server } from "socket.io";

export default function SocketHandler(req, res) {
    if (res.socket.server.io) {
        console.log("server is already running");
    }
    else{
        console.log('socket initializing');
        const io = new Server(res.socket.server);
        res.socket.server.io=io;
    }
    res.end();
}