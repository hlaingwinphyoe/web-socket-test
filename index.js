let express = require('express');
let socket = require('socket.io');

/** App Setup */
let app = express();

/** Server Setup */

let server = app.listen(3000, ()=> {
    console.log('Project is running on localhost:3000');
});


/** Route Setup */
app.get("/", (res,req) => {
    req.sendFile(__dirname+'/public/index.html')
})

/** Socket Setup */
let io = socket(server);
io.on('connection',(socket) => {
    
    socket.on('chat',(data) => {
        io.sockets.emit('chat',data)
    });

    socket.on('typing',(name) => {
        socket.broadcast.emit('typing',name)
    });
});