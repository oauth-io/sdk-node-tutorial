function init_oauthio() {
	OAuth.initialize(credentials.key);
}

function retrieve_token(callback) {
	$.ajax({
		url: '/oauth/token',
		success: function(data, status) {
			callback(null, data.token);
		},
		error: function(data) {
			callback(data);
		}
	});
}

function authenticate(token, callback) {
	OAuth.popup('google', {
		state: token,
		// Google requires the following field
		// to get a refresh token
		authorize: {
		    approval_prompt: 'force'
		}
	}).done(function(r) {
		$.ajaxSetup({
	     beforeSend: function(xhr, settings) {
	         function getCookie(name) {
	             var cookieValue = null;
	             if (document.cookie && document.cookie != '') {
	                 var cookies = document.cookie.split(';');
	                 for (var i = 0; i < cookies.length; i++) {
	                     var cookie = jQuery.trim(cookies[i]);
	                     // Does this cookie string begin with the name we want?
	                 if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                     break;
	                 }
	             }
	         }
	         return cookieValue;
	         }
	         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
	             // Only send the token to relative URLs i.e. locally.
	             xhr.setRequestHeader("x-csrf-token", getCookie('XSRF-TOKEN'));
	         }
	     }
	});
			$.ajax({
				url: '/oauth/signin',
				method: 'POST',
				data: {
					code: r.code
				},
				success: function(data, status) {
					callback(null, data);
				},
				error: function(data) {
					callback(data);
				}
			});
		})
		.fail(function(e) {
			console.log(e);
		});
}

function retrieve_user_info(callback) {
	$.ajax({
		url: '/me',
		success: function (data, status) {
			callback(data);
		},
		error: function (data) {

		}
	});
}

$('#login_button').click(function() {
	init_oauthio();
	retrieve_token(function(err, token) {
		authenticate(token, function(err) {
			if (!err) {
				retrieve_user_info(function(user_data) {
					$('#name_box').html(user_data.name)
					$('#email_box').html(user_data.email);
					$('#img_box').attr('src', user_data.avatar);
				});
			}
		});
	});
});
