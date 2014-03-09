var async = require('async');
var auth = require('./middlewares/authorization');
var http = require('https');

/**
 * Route middlewares
 */
 var userController		= require('../app/controllers/userController'),
	 shredsController	= require('../app/controllers/shredsController'),
	 conversationController = require('../app/controllers/conversationController');


 module.exports = function(app, passport){
	app.get('/', userController.index);
	app.get('/youtube', userController.youtube);


	app.get('/login', userController.login);
	app.get('/signup', userController.signup);
	app.get('/logout', userController.logout);

	// todo : change to user api
	app.post('/api/shredders/', userController.register);

	// Shreds
	app.post('/api/shreds/', shredsController.create);
	app.get('/api/shreds/query', shredsController.query);
	app.get('/api/shreds/:id', shredsController.get);
	app.post('/api/shreds/:id/rate', shredsController.rate);
	app.post('/api/shreds/:id/comment', shredsController.comment);


	// Users
	app.get('/api/user/query', userController.query);
	app.put('/api/user/:id', auth.requiresLogin, userController.update);
	app.get('/api/user/:id', userController.getById);
	app.get('/api/user', userController.list);
	app.post('/api/user/:id/addFan/:faneeId', auth.requiresLogin, userController.addFan);
	app.post('/api/user/:id/deleteNotification/:nid', auth.requiresLogin, userController.deleteNotification);


	app.post('/users/session',
		passport.authenticate('local', {
			//failureRedirect: '/login',
			//failureFlash: 'Invalid email or password.'
		}), userController.session);

	app.post('/api/conversation', auth.requiresLogin, conversationController.create);
	app.get('/api/conversation/:id', auth.requiresLogin, conversationController.get);
	app.post('/api/conversation/:id/sendMessage', auth.requiresLogin, conversationController.sendMessage);


	// TODO: This is code for authenticating with youtube
	// It doesnt work..
	// app.get('/auth/google/callback', function (req,res) {

	// 	var data = {
	// 		code : req.query.code,
	// 		client_id : '845386364672-e9phdl0vv2kehoefs9gedepf2t5js3t9.apps.googleusercontent.com',
	// 		client_secret : '68faY8p6qrHNMFqj0MGq2Kax',
	// 		redirect_uri : '/#loginsuccess',
	// 		grant_type : 'authorization_code'
	// 	};

	// 	var userString = JSON.stringify(data);

	// 	var headers = {
	// 		'Content-Type': 'application/x-www-form-urlencoded',
	// 		'Content-Length': userString.length
	// 	};

	// 	var options = {
	// 		hostname: 'accounts.google.com',
	// 		port: 443,
	// 		path: '/o/oauth2/token',
	// 		method: 'POST',
	// 		headers: headers
	// 	};
	// 		console.log("sap2 " + req.params);

	// 	var request = http.request(options, function(response) {
	// 		console.log("sap");
	// 		response.setEncoding('utf-8');

	// 		var responseString = '';

	// 		response.on('data', function(data) {
	// 			responseString += data;
	// 		});

	// 		response.on('end', function() {
	// 			console.log("end: " + responseString);
	// 			var resultObject = JSON.parse(responseString);
	// 		});
	// 	});

	// 	request.on('error', function(e) {
	// 		console.log("err: " + e);
	// 	});

	// 	request.write(userString);
	// 	request.end();
	// });



	app.get('/users/:userId', userController.show)
	app.param('userId', userController.user)
};