const { io } = require('../server');

io.on('connection', (client) => {

  console.log('User connected');

  client.emit('sendMessage', {
    usuario: 'Admin',
    mensaje: 'Welcome'
  });

  client.on('disconnect', () => {
    console.log('User disconnected');
  });

  client.on('sendMessage', (data, callback) => {
    console.log(data);
    client.broadcast.emit('sendMessage', data);
  });

});