var socket = io();

socket.on('connect', function() {
  console.log('Server connected');
});

// Listen
socket.on('disconnect', function() {
  console.log('Connection to the server has been lost');
});

// Send information
socket.emit('sendMessage', {
  usuario: 'Daniela',
  mensaje: 'Hi there!'
}, function(resp) {
  console.log('server response: ', resp);
});

// Listen information
socket.on('sendMessage', function(message) {
  console.log('Server:', message);
});