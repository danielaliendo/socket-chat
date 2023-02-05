var socket = io();

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
    renderUsers(users)
  });
});

// Listen
socket.on('disconnect', function () {
  console.log('Connection to the server has been lost');
});


// Listen information
socket.on('createMessage', function (message) {
  renderMessage(message, false)
});

socket.on('usersConnected', function (users) {
  renderUsers(users);
});

// Private messages
socket.on('sendPrivateMessage', (message) => {
  console.log({message})
})