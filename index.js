// Broadcast a message to connected users when someone connects or disconnects
// Add support for nicknames
// Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
// Add “{user} is typing” functionality
// Show who’s online
// Add private messaging

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var connectMsg = 'Anonymous User Connected';
var disconnectMsg = 'Anonymous User Disconnected';

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  io.emit('chat message', connectMsg);
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    io.emit('chat message', disconnectMsg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
