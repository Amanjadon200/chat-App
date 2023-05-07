const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors);
const http=require('http');
const httpServer=http.createServer(app);
//attaching socket with http server
const io = require("socket.io")(httpServer,{
    cors:{
        origin:'http://localhost:3000',
        methods:["GET","POST"]
    }});
io.on('connection',(socket)=>{
    console.log("user connected",socket.id)
    socket.on('disconnect',()=>{
        console.log('user disconnected',socket.id)
    })
    socket.on('user_joined',(data)=>{
        socket.join(data);
        console.log('socket with id:',socket.id,"joined by this user ",data)
    })
    socket.on('send_message',(data)=>{
        console.log('data',data)
        socket.to(data.room).emit('recieve_message',data);
    })
})
httpServer.listen(3001,()=>{
    console.log('server is listening at 3001')
})
