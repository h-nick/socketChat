var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('uName') || !params.has('rName')) {
	window.location = 'index.html';
	throw new Error('The name and room are necessary');
}

var connectedUser = {
	userName: params.get('uName'),
	roomName: params.get('rName')
};

socket.on('connect', function() {
	socket.emit('chatLogin', connectedUser, function(response) {
		renderUsers(response);
	});
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

socket.on('createMessage', function(message) {
	renderMessages(message, false);
	scrollBottom();
});

socket.on('listConnectedUsers', function(signal) {
	renderUsers(signal);
});

socket.on('privateMessage', function(message) {
	console.log(message);
});