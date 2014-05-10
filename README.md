OAuth.io tutorial for server-side flow (Node.js)
================================================

This tutorial will show you how to integrate OAuth.io in your Node.js backend with a web front-end, using the server-side flow.

This tutorial uses both the OAuth.io front-end JavaScript SDK and the OAuth.io Node.js SDK.

This tutorial is based on a git repository that you can clone. You can follow the instructions by yourself or checkout each step of the tutorial, which are marked by tags in the git repository.

The tutorial contains the following steps :


**Part 1 : server-side code**

**step-0** Getting the code (tagged *step-0*)
**step-1** Initializing OAuth.io server-side (tagged *step-1*)
**step-2** Adding a state token retrieval endpoint server-side (tagged *step-2*)
**step-3** Adding an authentication endpoint server-side (tagged *step-3*)
**step-4** Adding a request endpoint server-side

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

Once that's done, you can initialize the framework server-side.
