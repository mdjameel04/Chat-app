import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";


const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin: "*",
        methods:["get", "post"]
    }
});

io.on("connection", (Socket)=>{
    console.log("A new user connected", Socket.id)
});

// when client sends message



const PORT = 5000;

server.listen(PORT, ()=> console.log(`server is successfully running on ${PORT}`))