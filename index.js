// Add support for nicknames
// Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
// Add “{user} is typing” functionality
// Show who’s online
// Add private messaging

var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var persons = [];
var usernames = [];

function person(name) {
  this.username = name;
  this.typing = false;
  this.vrFlag = false;
}

app.use(express.static('styles'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){

  socket.on('adduser', function(user){
    var newuser = new person(user);
    persons.push(newuser);
    usernames.push(newuser.username);
    io.emit('updateusers', usernames);
  });

  socket.on('chat message', function(clientUsername, msg){
    io.emit('chat message', clientUsername, msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});