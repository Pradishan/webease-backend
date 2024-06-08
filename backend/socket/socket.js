import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: process.env.FRONTEND_API_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

export const getReceiverSocketID = (receiverID) => {
    return userSocketMap[receiverID];
};

const userSocketMap = {}; //{userID:socketID}

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    const userID = socket.handshake.query.userID;
    if(userID != "undefined"){
        userSocketMap[userID] = socket.id;
    }
    io.emit("getOnlineUsers" ,Object.keys(userSocketMap)); // send to all connected clients
    socket.on("disconnect", () => {
        console.log("user disconnected",socket.id);
        delete userSocketMap[userID];
        io.emit("getOnlineUsers" ,Object.keys(userSocketMap));
    });
});

export {app,server,io}