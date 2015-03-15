var readline = require('readline'),
socketio = require('socket.io-client');
// util = require('util');
 
var socket = socketio.connect(process.argv[2]);
var rl = readline.createInterface(process.stdin, process.stdout);

rl.on('line', function (line) {
    socket.emit('send', { message: line });
    rl.prompt(true);
});

socket.on('message', function (data) {
    console.log(data.message);
});
