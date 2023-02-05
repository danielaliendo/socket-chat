const {io} = require('../server');
const Users = require('../classes/users');
const {createMessage} = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

  console.log('User connected');

  client.on('enterChat', (user, callback) => {

    if (!user.name || !user.room) {
      return callback({
        error: true,
        msg: 'name and room params are required'
      })
    }

    client.join(user.room);

    const usersList = users.addUser(client.id, user.name, user.room);

    client.broadcast.to(user.room).emit('usersConnected', users.getRoomUsers(user.room))

    callback(usersList)
  });

  client.on('sendMessage', (data) => {

    const user = users.getUser(client.id);

    if (user) {
      const message = createMessage(user.name, data.message);
      // Send a message to everybody in the room
      client.broadcast.to(user.room).emit('createMessage', message)
    }

  })

  client.on('disconnect', () => {
    const deletedUser = users.deleteUser(client.id)

    client.broadcast.to(deletedUser.room).emit('createMessage', createMessage('Admin', `${deletedUser?.name}  has left the room`));

    client.broadcast.to(deletedUser.room).emit('usersConnected', users.getRoomUsers(deletedUser.room))

  });

  client.on('sendPrivateMessage', ({from = '', message = ''}) => {

    const user = users.getUser(client.id);

    if (user) {
      const newMessage = createMessage(user?.name, message);
      client.broadcast.to(from).emit('sendPrivateMessage', newMessage);
    }

  })
});