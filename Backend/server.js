import express from "express";
import cors from "cors";
import http  from "http";
import { Server } from "socket.io";

const app = express()
app.use(cors())

const server = http.createServer(app)
app.get("/", (req, res) => res.send("Hello from server"))

const io = new Server(server, {
    cors:{
        origin: "http://localhost:5173",
        methods:["GET", "POST"],
    }
});

io.on("connection", (socket)=>{
    console.log("A new user connected", socket.id)
// client message
socket.on("client:",(data) => {
    console.log("Message", data)
    // reply
    socket.emit("reply", `server received your message ${data}`)
});
//when server disconnected

socket.on("disconnect", ()=>{
    console.log("A user disconnected:", socket.id)
});
});


const PORT = 5000;

server.listen(PORT, ()=> console.log(`server is successfully running on ${PORT}`))