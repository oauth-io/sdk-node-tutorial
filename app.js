var express = require('express');

/* Requiring the lib */

var oauth = require('oauthio');

var app = express();

app.use(express.static('public'));

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

// Add a .get endpoint for the state token here (/oauth/token) (done in step-2)


// Add a .post endpoint for the state token here (/oauth/signin) (done in step-3)


// Add a .get endpoint for the request here (/me) (done in step-4)

app.listen(process.env.NODEJS_PORT || 3000, function () {
	console.log('OAuth.io Tutorial server running on port ' + (process.env.NODEJS_PORT || 3000));
});