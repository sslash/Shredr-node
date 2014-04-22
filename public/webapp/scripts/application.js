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
	window.RAF = window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 1000 / FPS);
                        };
	window.CRAF = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

	Shredr.on("initialize:before", function(options){
		this.addRegions({
			"navigation" : "#navigation",
			"kicker" : "#kicker",
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

	Shredr.addInitializer(function() {
		Backbone.Model.prototype.setDateString = function (date) {
			if ( !(date instanceof Date) ) { date = new Date(date); }
			var curr_date = date.getDate();
			var curr_month = date.getMonth();
			var curr_year = date.getFullYear();
			var str = curr_date + '-' + curr_month + '-' + curr_year;
			this.set({'dateString': str});
		};
	});

	Shredr.vent.on("user:auth:success", function(userdata) {
		Shredr.loggedIn = true;
		Shredr.user = new User(userdata);
		Shredr.user.fetch();
		// Shredr.mainController.renderNavigationView(true);
		// Shredr.mainController.renderLangingView();
	});

	Shredr.addInitializer(function(options){
		this.router = new MainRouter({controller:options.controller});
		Backbone.history.start({pushstate: true});
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
		Shredr.buzz.start();
		if (window.message && window.message === "user:register:success") {
			Shredr.buzz.openMessageModal();
		}
	});

	Shredr.mainController = new RoutesController();

	// main controller!
	Shredr.buzz = new EventController();
	Shredr.start({controller : Shredr.mainController} );

	return Shredr;
});
