var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(process.env.PORT || 5000 );
console.log("Listening on 5000");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("Socket connected..");

  socket.on('disconnect', function(){
      console.log("Client disconnect");
  });

  //Send message
  socket.on('send message', function(data){
    io.emit('new message', {msg:  data});
  });
});
