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


// Add a .post endpoint for the state token here (/oauth/signin) (done in step-3)


// Add a .get endpoint for the request here (/me) (done in step-4)

app.listen(process.env.NODEJS_PORT || 3000, function () {
	console.log('OAuth.io Tutorial server running on port ' + (process.env.NODEJS_PORT || 3000));
});