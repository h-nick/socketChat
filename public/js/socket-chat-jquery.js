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