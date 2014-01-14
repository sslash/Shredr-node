var async = require('async');
var auth = require('./middlewares/authorization');
var http = require('https');

/**
 * Route middlewares
 */

 //var snippetsAuth = [auth.requiresLogin, auth.snippet.hasAuthorization]
 var userController		= require('../app/controllers/userController');
 var shredsController	= require('../app/controllers/shredsController');



 module.exports = function(app, passport){
	app.get('/', userController.index);
	app.get('/youtube', userController.youtube);


	app.get('/login', userController.login);
	app.get('/signup', userController.signup);
	app.get('/logout', userController.logout);
	app.post('/api/shredders/', userController.register);
	app.post('/api/shreds/', shredsController.create);
	app.post('/users/session',
		passport.authenticate('local', {
			//failureRedirect: '/login',
			//failureFlash: 'Invalid email or password.'
		}), userController.session);


	// TODO: This is code for authenticating with youtube
	// It doesnt work..
	app.get('/auth/google/callback', function (req,res) {

		var data = {
			code : req.query.code,
			client_id : '845386364672-e9phdl0vv2kehoefs9gedepf2t5js3t9.apps.googleusercontent.com',
			client_secret : '68faY8p6qrHNMFqj0MGq2Kax',
			redirect_uri : '/#loginsuccess',
			grant_type : 'authorization_code'
		};

		var userString = JSON.stringify(data);

		var headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': userString.length
		};

		var options = {
			hostname: 'accounts.google.com',
			port: 443,
			path: '/o/oauth2/token',
			method: 'POST',
			headers: headers
		};
			console.log("sap2 " + req.params);

		var request = http.request(options, function(response) {
			console.log("sap");
			response.setEncoding('utf-8');

			var responseString = '';

			response.on('data', function(data) {
				responseString += data;
			});

			response.on('end', function() {
				console.log("end: " + responseString);
				var resultObject = JSON.parse(responseString);
			});
		});

		request.on('error', function(e) {
			console.log("err: " + e);
		});

		request.write(userString);
		request.end();
	});



	app.get('/users/:userId', userController.show)
	app.get('/auth/facebook',
		passport.authenticate('facebook', {
			scope: [ 'email', 'user_about_me'],
			failureRedirect: '/login'
		}), userController.signin)
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			failureRedirect: '/login'
		}), userController.authCallback)
	app.get('/auth/github',
		passport.authenticate('github', {
			failureRedirect: '/login'
		}), userController.signin)
	app.get('/auth/github/callback',
		passport.authenticate('github', {
			failureRedirect: '/login'
		}), userController.authCallback)
	app.get('/auth/twitter',
		passport.authenticate('twitter', {
			failureRedirect: '/login'
		}), userController.signin)
	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			failureRedirect: '/login'
		}), userController.authCallback)
	app.get('/auth/google',
		passport.authenticate('google', {
			failureRedirect: '/login',
			scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
			]
		}), userController.signin);

	// app.get('/auth/google/callback',
	// 	passport.authenticate('google', {
	// 		failureRedirect: '/login'
	// 	}), userController.authCallback);
	app.get('/auth/linkedin',
		passport.authenticate('linkedin', {
			failureRedirect: '/login',
			scope: [ 
			'r_emailaddress'
			]
		}), userController.signin)
	app.get('/auth/linkedin/callback',
		passport.authenticate('linkedin', {
			failureRedirect: '/login'
		}), userController.authCallback)

	app.param('userId', userController.user)
};