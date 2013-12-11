define([
	'backbone',
	'communicator',
	'hbs!tmpl/welcome',

	'eventsController',
    'routesController',
    'mainRouter',

    // models
    'models/user'
],

function( Backbone, Communicator, Welcome_tmpl,EventController, RoutesController, MainRouter, User ) {
    'use strict';

	//var welcomeTmpl = Welcome_tmpl;

	// var App = new Backbone.Marionette.Application();

	// /* Add application regions here */
	// App.addRegions({});

	// /* Add initializers here */
	// App.addInitializer( function () {
	// 	document.body.innerHTML = welcomeTmpl({ success: "CONGRATS!" });
	// 	Communicator.mediator.trigger("APP:START");
	// });

	window.Shredr = new Backbone.Marionette.Application();

	Shredr.on("initialize:before", function(options){
		this.addRegions({
			"navigation" : "#navigation",
			"modal" : "#modal",
			"main" : "#main",
			"footer" : "#footer"
		});
	});

	Shredr.addInitializer(function(options) {
		$.ajaxSetup({
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
			}
		});
	});

	Shredr.vent.on("user:auth:success", function(userdata) {
		Shredr.loggedIn = true;
		Shredr.user = new User(userdata);
		Shredr.mainController.renderNavigationView(true);
	});

	Shredr.addInitializer(function(options){
		this.router = new MainRouter({controller:options.controller});
		Backbone.history.start();
	});

	Shredr.on("initialize:before", function(options){
		if ( window.user ) {
			Shredr.vent.trigger("user:auth:success", window.user);
		}
	});

	Shredr.on("initialize:after", function(options){
		if (window.message && window.message === "user:register:success")
			Shredr.buzz.openMessageModal();
	});

	Shredr.mainController = new RoutesController();
	Shredr.buzz = new EventController();
	Shredr.start({controller : Shredr.mainController} );

	return Shredr;
});
