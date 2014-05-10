function init_oauthio() {
	OAuth.initialize(credentials.key);
}

function retrieve_token(callback) {
	$.ajax({
		url: '/oauth/token',
		success: function (data, status) {
			callback(data.token);
		}
	});
}

function authenticate(code, callback) {
	$.ajax({
		url: '/oauth/signin',
		method: 'POST',
		data: {
			code: code
		},
		success: function (data, status) {
			callback(data);
		}
	});
}

function retrieve_user_info(callback) {
	// Add the code to perform a user request here
}

$('#login_button').click(function() {
	init_oauthio();
	retrieve_token(function(err, code) {
		OAuth.popup('facebook')
			.done(function(r) {
				authenticate(code, function(err) {
					if (!err) {
						retrieve_user_info(function(user_data) {
							$('#name_box').html(user_data.name)
							$('#email_box').html(user_data.email);
							$('#img_box').attr('src', user_data.avatar);
						});
					}
				});
			})
			.fail(function(e) {
				console.log(e);
			});

	});

});
