var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

/* Requiring the lib */

var oauth = require('oauthio');

var app = express();

app.use(express.static('public'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({secret: 'keyboard cat', key: 'sid'}));

/* Initialization */
try {
	var config = require('./config');	
} catch (e) {
	// Create a config.js file returning an object like the following if you haven't done it yet
	var config = {
		key: 'your_key',
		secret: 'your_secret'
	};
}

oauth.initialize(config.key, config.secret);

/* Endpoints */

app.get('/oauth/token', function (req, res) {
	var token = oauth.generateStateToken(req.session);

	res.json({
		token: token
	});
});


app.post('/oauth/signin', function (req, res) {
	var code = req.body.code;
	oauth.auth('google', req.session, {
		code: code
	})
	.then(function (request_object) {
		// Here the user is authenticated, and the access token 
		// for the requested provider is stored in the session.
		// Continue the tutorial or checkout the step-4 to get
		// the code for the request
		res.send(200, 'The user is authenticated');
	})
	.fail(function (e) {
		console.log(e);
		res.send(400, 'Code is incorrect');
	});
});


// Add a .get endpoint for the request here (/me) (done in step-4)

app.listen(process.env.NODEJS_PORT || 3000, function () {
	console.log('OAuth.io Tutorial server running on port ' + (process.env.NODEJS_PORT || 3000));
});