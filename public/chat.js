var socket = io.connect("http://127.0.0.1:3000");

//query DOM
var output = document.getElementById('output'),
    handle = document.getElementById('handle'),
    message = document.getElementById('message'),
    feedback = document.getElementById('feedback'),
    sendBtn = document.getElementById('send');


sendBtn.addEventListener('click', function()
{
     socket.emit('chat', {handle:handle.value, message:message.value})
})

message.addEventListener('keypress', function()
{
     socket.emit('typing', {handle:handle.value})
})

socket.on('chat', function(data)
{
  feedback.innerHTML = "";
  output.innerHTML += "<p><strong>" + data.handle + "</strong>: " + data.message + "</p>"
});


socket.on('typing', function(data)
{
  feedback.innerHTML = "<p><em>" + data.handle + " is typing....</em></p>";
})
