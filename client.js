var readline = require('readline'),
socketio = require('socket.io-client'),
util = require('util');
 
var nick;
var socket = socketio.connect('http://localhost:8080');
var rl = readline.createInterface(process.stdin, process.stdout);

// Set the username
rl.question("Please enter a nickname: ", function(name) {
    nick = name;
    var msg = nick + " has joined the chat";
    socket.emit('send', { type: 'notice', message: msg });
    rl.prompt(true);
});

rl.on('line', function (line) {
    // send chat message
    socket.emit('send', { type: 'chat', message: line, nick: nick });
    rl.prompt(true);
});

function console_out(msg) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(msg);
    rl.prompt(true);
}

socket.on('message', function (data) {
    var leader;
    if (data.type == 'chat' && data.nick != nick) {
        leader = data.nick;
        console_out(leader + data.message);
    }
});
