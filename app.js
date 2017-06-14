var express = require('express');
var socket = require('socket.io')
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));


var http_server = app.listen(port, function(){
  console.log("listening on " + port)
});


var io = socket(http_server); //basically upgrade/extend the http server to being a socket server

//this listens for incoming socket connections
io.on('connection', function(socket)
{
  console.dir('socket pipe created ' + socket.id);

  socket.on("chat", function(data)
  {
    //received data from a socket now send out to all other sockets
    io.sockets.emit("chat", data)
  })

  socket.on("typing", function(data)
  {
    //received data from a socket now send out to all other sockets
     socket.broadcast.emit("typing", data)
  })

})
