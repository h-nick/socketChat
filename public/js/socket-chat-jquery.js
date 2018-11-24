var params = new URLSearchParams(window.location.search);

function renderUsers(userArray) {
	console.log(userArray);

	var html = '';
	html += '<li>';
	html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('rName') + '</span></a>';
	html += '</li>';

	for(var i = 0; i < userArray.length; i++) {
		html += '<li>';
		html += '<a data-id="'+ userArray[i].uID +'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"><span>'+ userArray[i].uName +'<small class="text-success">online</small></span></a>';
		html += '</li>';
	}

	$('#divUsuarios').html(html);
}

function renderMessages(message, myself) {
	var html = '';
	var date = new Date(message.date);
	var msgTime = date.getHours() + ':' + date.getMinutes();

	var adminClass = 'info';
	if(message.uName === 'Server') adminClass = 'danger';

	if(myself) {
		html += '<li class="reverse animated fadeIn">'
		html += '<div class="chat-content">'
		html += '<h5>'+ message.uName +'</h5>'
		html += '<div class="box bg-light-inverse">'+ message.message +'</div>'
		html += '</div>'
		html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
		html += '<div class="chat-time">'+ msgTime +'</div>'
		html += '</li>'
	}
	else {
		html += '<li class="animated fadeIn">'
		if(message.uName !== 'Server') html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
		html += '<div class="chat-content">'
		html += '<h5>'+ message.uName +'</h5>'
		html += '<div class="box bg-light-'+ adminClass + '">'+ message.message +'</div>'
		html += '</div>'
		html += '<div class="chat-time">'+ msgTime +'</div>'
		html += '</li>'
	}

	$('#divChatbox').append(html);
}

function scrollBottom() {

	var divChatbox = $('#divChatbox');

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

$('#divUsuarios').on('click', 'a', function() {
	var id = $(this).data('id');
	if(id) console.log(id);
});

$('#sendForm').on('submit', function(event) {
	event.preventDefault();

	if($('#textMsg').val().trim().length === 0) return;
	
	socket.emit('createMessage', {
		uName: params.get('uName'),
		message: $('#textMsg').val()
	}, function(message) {
		$('#textMsg').val('').focus();
		renderMessages(message, true);
		scrollBottom();
	});
});