const { io } = require('../server');
const Users = require('../classes/users.js').Users;
const createMessage = require('../utils/utils.js').createMessage;

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
		client.broadcast.emit('createMessage', createMessage(
			'Server', `${disconnectedUser.uName} has disconnected from the chat.`)
		);
		client.broadcast.emit('listConnectedUsers', users.getAllUsersInChat());
	});

	client.on('createMessage', signal => {
		let message = createMessage(users.getUserInChatByID(client.id).uName, signal.message);
		client.broadcast.emit('createMessage', message);
	});
});