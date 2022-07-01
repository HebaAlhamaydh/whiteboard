'use strict';
const express=require('express')
const app=express();
let httpServer = require("http").createServer(app);
let io = require("socket.io")(httpServer);

let connections=[];
io.on("connect",(socket)=>{
connections.push(socket);
console.log(`${socket.id} has connected`);

socket.on("down",(data)=>{
    connections.forEach(con=>{
        if(con.id !== socket.id){
            con.emit("ondown",{x:data.x,y:data.y});
        }
    })
})
socket.on("draw",(data)=>{
    connections.forEach(con=>{
        if(con.id !== socket.id)
        {
            con.emit("onDraw",{x:data.x,y:data.y})
        }
    });

});
});
// socket.on('disconnect',(reson)=>{
//     console.log(`${socket.id} is disconnected`)
//     connections=connections.filter((con)=>con.id!==socket.id);
// });
// });

app.use(express.static('public'));
const PORT=process.env.PORT||5000;
httpServer.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
});