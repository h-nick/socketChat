var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('name')) {
	window.location = 'index.html';
	throw new Error('The name is necessary');
}

var connectedUser = {
	userName: params.get('name')
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

// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

socket.on('createMessage', function(mensaje) {
    console.log('BROADCAST:', mensaje);
});

socket.on('listConnectedUsers', function(signal) {
	console.log('BROADCAST CONNECTED USERS:', signal);
});