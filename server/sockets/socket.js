const { io } = require('../server');
const Users = require('../classes/users.js').Users;
const createMessage = require('../utils/utils.js').createMessage;

const users = new Users();

io.on('connection', (client) => {

	client.on('chatLogin', (signalParam, callbackFn) => {
		console.log(signalParam, ' has logged in.');

		if(!signalParam.userName || !signalParam.roomName) return callbackFn({
			error: true,
			message: 'The username/roomname is mandatory.'
		});

		client.join(signalParam.roomName);
		callbackFn(users.addUserToChat(client.id, signalParam.userName, signalParam.roomName));
		client.broadcast.to(signalParam.roomName).emit('listConnectedUsers', users.getAllUsersInRoom(signalParam.roomName));
	});

	client.on('disconnect', () => {
		let disconnectedUser = users.deleteUser(client.id);
		client.broadcast.to(disconnectedUser.rName).emit('createMessage', createMessage(
			'Server', `${disconnectedUser.uName} has disconnected from the chat.`)
		);
		client.broadcast.to(disconnectedUser.rName).emit('listConnectedUsers', users.getAllUsersInRoom(disconnectedUser.rName));
	});

	client.on('createMessage', signal => {
		let message = createMessage(users.getUserInChatByID(client.id).uName, signal.message);
		client.broadcast.to(users.getUserInChatByID(client.id).rName).emit('createMessage', message);
	});

	client.on('privateMessage', data => {
		let sender = users.getUserInChatByID(client.id);
		client.broadcast.to(data.receiverID).emit('privateMessage', createMessage(sender.uName, data.message));
	});
});