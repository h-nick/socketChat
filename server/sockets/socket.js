const { io } = require('../server');
const Users = require('../classes/users.js').Users;

const users = new Users();

io.on('connection', (client) => {

	client.on('chatLogin', (signalParam, callbackFn) => {
		console.log(signalParam, ' has logged in.');

		if(!signalParam.userName) return callbackFn({
			error: true,
			message: 'The username is mandatory.'
		});

		callbackFn(users.addUserToChat(client.id, signalParam.userName));
		client.broadcast.emit('listConnectedUsers', users.getAllUsersInChat());
	});

	client.on('disconnect', () => {
		let disconnectedUser = users.deleteUser(client.id);
		client.broadcast.emit('createMessage', {
			user: 'Server',
			msg: `${disconnectedUser.uName} has disconnected from the chat.`
		});
		client.broadcast.emit('listConnectedUsers', users.getAllUsersInChat());
	});
});