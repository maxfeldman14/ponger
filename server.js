var socketio = require('socket.io');
 
// Listen on 8080
var io = socketio.listen(8080);
 
io.sockets.on('connection', function (socket) {
 
    // Broadcast a user's message to everyone else in the room
    socket.on('send', function (data) {
        console.log(data);
        io.sockets.emit('message', data);
    });
 
});
