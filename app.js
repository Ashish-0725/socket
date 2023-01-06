const express=require("express");
const app=express();

app.set("view engine","ejs");

//connecting app server to http
const http=require("http").Server(app);

//connecting http server to socket
const io=require("socket.io")(http);

app.get("/",(req,res)=>{
    // res.json("get request");
    res.render("home");
})

//new connection
io.on('connect',socket=>{
    console.log("user is connected");

    socket.on("disconnect",()=>{
        console.log("user is disconnected");
    });

    socket.on('message',msg=>{
        console.log("client msg = "+msg);
        socket.broadcast.emit('message',msg);

    });

    socket.emit('message 0',"msg from server");
    socket.emit('message1',"msg from server 1");

});

http.listen(3000,()=>{
    console.log("server running at port 3000");
})