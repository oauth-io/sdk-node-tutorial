OAuth.io tutorial for server-side flow (Node.js)
================================================

This tutorial will show you how to integrate OAuth.io in your Node.js backend with a web front-end, using the server-side flow.

This tutorial uses both the OAuth.io front-end JavaScript SDK and the OAuth.io Node.js SDK.

This tutorial is based on a git repository that you can clone. You can follow the instructions by yourself or checkout each step of the tutorial, which are marked by tags in the git repository.

In this tutorial, we'll have to implement the server-side flow. This flow includes the following steps :

- The client asks the backend for a state token through GET
- The backend gives a state token
- The client runs the OAuth flow (popup or redirect) with that token
- OAuth.io responds with a code
- The client gives that code to the backend through POST
- The backend sends that code to OAuth.io and is given an access_token in return
- The backend saves the access_token in the session for future use from other endpoints

**Running the server**

Whenever you want to test the code, you can run the command :

```sh
$ node app.js
```

This will launch the server on the port `3000`. Then you can access the page of the tutorial in your browser. This page contains a login button and is supposed to display the user's basic information (name, email and avatar) once everything's finished.

You'll have to run it again everytime you change the backend.

You'll be able to see on the right which endpoint has already been coded or not.

The tutorial thus contains the following steps :

**Part 1 : server-side code**

**step-0** Getting the code (tagged *step-0*)
**step-1** Initializing OAuth.io server-side (tagged *step-1*)
**step-2** Adding a state token retrieval endpoint server-side (tagged *step-2*)
**step-3** Adding an authentication endpoint server-side (tagged *step-3*)
**step-4** Adding a request endpoint server-side (tagged *step-4*)

**Part 2 : client-side code**

**step-5** Initializing OAuth.io client-side (tagged *step-5*)
**step-6** Adding a call to retrieve the state token (tagged *step-6*)
**step-7** Adding a call to authenticate the user (tagged *step-7*)
**step-8** Adding a call to the request endpoint to get user info (tagged *step-8*)

Before you start
----------------

To be able to follow the tutorial, you need to be registered on [oauth.io](https://oauth.io), and to have an application containing the provider **Facebook**, which must be set on **server-side** flow.

Part 1 : server-side code
-------------------------

In this part you'll have to get the code from our Github repository, and fill up gaps in it to complete the tutorial.

The project in the repository is a really simple webserver written in Node.js with expressjs, that serves a single static page. That page must allow a user to login through Facebook, retrieve his basic information (name, email, avatar), and finally display them on the page.

Everything that doesn't concern OAuth.io's integration has already been written to gain time.

**Step 0 :  Getting the code**

To checkout tutorial Github repository, just run the following commands :

```sh
$ git clone https://github.com/oauthio/sdk-node-tutorial
```

To get the beginning point and start coding, checkout the `step-0` tag :

```sh
$ git checkout step-0
```

Then you need to run `npm install` to install all the dependencies of the project.

```sh
$ npm install
```

You are now all set to follow the tutorial !

**Step 1 : Initializing OAuth.io server-side**

The first thing you need to do is to install the OAuth.io Node.js SDK and save it to the project's dependencies in the package.json :

```sh
$ npm install oauthio --save
```

Once that's done, you can initialize the framework server-side in the `app.js` file. This file holds the whole server side to simplify things. The backend is based on express.js.

In that file, you'll find comments defining placeholders for the different steps of the tutorial.

Here we need to initialize the SDK. To do that, you need to note the key and secret of the app you want to use on OAuth.io (in that case an app with the provider `Facebook`).

Once you have them, take a look at the `config.example.js`. This file holds a configuration that we will use in the app.js file, and will enable us to store the key and secret efficiently.

You'll have to fill the gaps, and rename the file as `config.js`.

```javascript
module.exports = {
    key: 'your_app_key',
    secret: 'your_app_secret'
};
```

Then, we will use this file to initialize the backend in `app.js`. You will find in that file a comment placeholder for the initialization part :

```javascript

/* Requiring the lib */

// Require oauthio here (done in step-1)

[...]

/* Initialization */

// Initialize oauthio here (done in step-1)

```


Replace the `// Require oauthio here (done in step-1)` comment with :

```javascript
var oauth = require('oauthio');
```

Replace the `// Initialize oauthio here` comment with :

```javascript
try {
    var config = require('./config.js');
    oauth.initialize(config.key, config.secret);
} catch (e) {
    console.log(e);
}
```

That's it for step 1.


If you want to get the code from step 1, just run the following command:

```sh
$ git checkout step-1 --force
```

Note that any change you made will be discarded and replaced by the code shown in this tutorial (except for your config.js file, that is ignored and will remain there).

**step-2** Adding a state token retrieval endpoint server-side

Now that the SDK is initialized, we need to add an endpoint to generate unique state tokens. In the `app.js` file, you'll find the following placeholder :

```javascript
// Add a .get endpoint for the state token here (/oauth/token) (done in step-2)
```

Replace it with the following code :

```javascript
app.get('/oauth/token', function (req, res) {
    // This generates a token and stores it in the session
    var token = oauth.generateStateToken(req);
    // This sends the token to the front-end
    req.json({
        token: token
    });
});
```

That's it for step 2. If you want to get the code right away, just run the following command :

```sh
$ git checkout step-2 --force
```

**step-3** Adding an authentication endpoint server-side

In this step we'll add an authentication endpoint in the backend so that the front-end can give it the code retrieved from OAuth.io.

In `app.js`, you'll find the following placeholder :

```javascript
// Add a .post endpoint for the state token here (/oauth/signin) (done in step-3)
```

Just replace this comment with a POST endpoint :

```javascript
app.post('/oauth/signin', function (req, res) {
    var code = req.body.code;
    // This sends the request to OAuth.io to get an access token
    oauth.auth(code, req)
    .then(function (r) {
        // Do something with r.access_token,
        // or r.get|post|put|delete|patch|me()
        // Or just send a success message :
        res.send(200, 'Success');
    })
    .fail(function (e) {
        // Handle an error
        console.log(e);
        res.send(500, 'An error occured');
    });
});
```

That's it for step 3. If you want to get the code right away, just run the following commands :

```sh
$ git checkout step-3 --force
```

**step-4** Adding a request endpoint server-side

In this step we'll add a final endpoint to our server which will allow the front-end to get information about the user.

In `app.js` you'll find the following placeholder :

```javascript
// Add a .get endpoint for the request here (/me) (done in step-4)
```

Just replace this comment with the following code :

```javascript
app.get('/me', function (req, res) {
    // This creates a request object that allows you
    // to use the .get|post|put|delete|patch|me() methods
    var request_object = oauth.create(req);

    // Here we'll use the me() method, but note that you
    // can get the same result from a .get('/me') to Facebook
    // and mapping its results to the right fields (name, email and avatar)
    request_object.me()
    .then(function (r) {
        // r contains the response from OAuth.io's mapping of the /me endpoint // on facebook
        res.json(r);
    })
    .fail(function (e) {
        // Handle an error
        console.log(e);
        res.send(500, 'An error occured');
    }); 
});
```

That's it for step 4. If you want to get the code right away, just run the following command :

```sh
$ git checkout step-4 --force
```


Part 2 : client-side code
-------------------------

**step-5** Initializing OAuth.io client-side

In this step we'll initialize the OAuth.io client-side JavaScript SDK. The SDK is already pointed by the `public/index.html` file. That file also points to `public/src/script.js` where we'll put our code.

Open the `public/src/script.js` file. You'll find placeholders for each remaining step. You just have to fill functions that are called in the right order at the end of the file like this :

```javascript
$('#login_button').click(function() {
    // called when the user clicks on the login button

    // calls your function to init the SDK
    init_oauthio();
    // calls your function to retrieve a token from your endpoint
    retrieve_token(function(err, token) {
        // launches the popup authentication, with the retrieved token
        OAuth.popup('facebook', {
                state: token
            })
            .done(function(r) {
                // calls your function to send the code to the 
                // authentication endpoint
                authenticate(r.code, function(err) {
                    if (!err) {
                        // calls your function to call your request endpoint
                        retrieve_user_info(function(user_data) {
                            // fills elements in the page with the user info
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
```

In this step, you just have to fill the initialization function :

```javascript
function init_oauthio() {
    // Add the code to initialize OAuth.io here
}
```

Fill that function like this :

```javascript
function init_oauthio() {
    OAuth.initialize(credentials.key);
}
```

The `credentials` object has to be created first. The `index.html` page also points to a `src/credentials.js` file in which we can setup that object. You need to rename the `src/credentials.example.js` to `src/credentials.js` and fill the key with your OAuth.io app key.

That's it for step 5. To get the code right away, just run the following command :

```sh
$ git clone step-5 --force
```

**step-6** Adding a call to retrieve the state token

In this step you'll have to fill the `retrieve_token` function to get a token from the backend. This is a simple GET request, that we'll perform thanks to jQuery's `ajax` method.

Just replace the placeholder :

```javascript
function retrieve_token(callback) {
    // Add the code to retrieve the state token here
}
```

with this code :

