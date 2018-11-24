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
		console.log(response);
	});
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

socket.emit('createMessage', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

socket.on('createMessage', function(message) {
    console.log('BROADCAST:', message);
});

socket.on('listConnectedUsers', function(signal) {
	console.log('BROADCAST CONNECTED USERS:', signal);
});

socket.on('privateMessage', function(message) {
	console.log(message);
});