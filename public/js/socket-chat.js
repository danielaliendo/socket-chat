var socket = io();

const params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
  window.location = 'index.html'
  throw new Error('name and room params are required');
}

const user = {
  name: params.get('name'),
  room: params.get('room')
}

socket.on('connect', function () {
  socket.emit('enterChat', user, (users) => {
    console.log('Users connected', users)
  });
});

// Listen
socket.on('disconnect', function () {
  console.log('Connection to the server has been lost');
});

// Send information
socket.emit('sendMessage', {
  usuario: 'Daniela',
  mensaje: 'Hi there!'
}, function (resp) {
  console.log('server response: ', resp);
});

// Listen information
socket.on('createMessage', function (message) {
  console.log('Server:', message);
});

socket.on('usersConnected', function (users) {
  console.log('Users connected', users);
});

// Private messages
socket.on('sendPrivateMessage', (message) => {
  console.log({ message })
})