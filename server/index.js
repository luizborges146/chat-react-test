const express = require('express');
const app = express()
const http = require("http");
const cors = require("cors");
const { Server} = require("socket.io")

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    //socket.on listen to the events
    socket.on("join_room", (data) => {// to join a room
        socket.join(data);
        console.log (`User with ID: ${socket.id} join room: ${data}`);
    })

    socket.on("send_message", (data) =>{// get the user message in the room
        //data.room will separete the messages per room
        socket.to(data.room).emit("receive_message",data)
        // console.log(data);

    })

    socket.on ("disconnect", () => { // disconnect a user 
        console.log("User disconnected", socket.id)
    })
});

server.listen(3001, () => {
    console.log("Server running")
} );
