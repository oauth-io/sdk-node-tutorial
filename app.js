var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

/* Requiring the lib */

// Require oauthio here (done in step-1)

var app = express();

app.use(express.static('public'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({secret: 'keyboard cat', key: 'sid'}));

/* Initialization */


// Require oauthio here (done in step-1)


/* Endpoints */

// Add a .get endpoint for the state token here (/oauth/token) (done in step-2)


// Add a .post endpoint for the state token here (/oauth/signin) (done in step-3)


// Add a .get endpoint for the request here (/me) (done in step-4)

app.listen(process.env.NODEJS_PORT || 3000, function () {
	console.log('OAuth.io Tutorial server running on port ' + (process.env.NODEJS_PORT || 3000));
});