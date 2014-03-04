define([
	'backbone.marionette',
	'communicator',

	'eventsController',
    'routesController',
    'mainRouter',

    'collections/shredsCollection',
    // models
    'models/user'
],

function( Marionette, Communicator,EventController, RoutesController,
			MainRouter, ShredsCollection, User ) {
    'use strict';

	window.Shredr = new Marionette.Application();

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
		// Shredr.mainController.renderNavigationView(true);
		// Shredr.mainController.renderLangingView();
	});

	Shredr.addInitializer(function(options){
		this.router = new MainRouter({controller:options.controller});
		Backbone.history.start();
	});

	Shredr.on("initialize:before", function(options){
		if ( window.user && window.user.username ) {
			Shredr.user = new User(user);
			Shredr.vent.trigger("user:auth:success", window.user);
		}

		if ( window.shreds ) {
			Shredr.shreds = new ShredsCollection(window.shreds);
		}
	});

	Shredr.on('initialize:after', function() {
		var tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
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
