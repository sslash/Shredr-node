define([
	'backbone',
	'hbs!tmpl/stage/welcomeBackView_tmpl',

	'models/shred'
	],
	function( Backbone, WelcomebackviewTmpl, Shred ) {
		'use strict';

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({

			className: 'col-sm-6 half half-box stage-box clear-marg box-inner',

			initialize: function() {
				this.listenTo(Shredr.user, 'change:notifications', this.render);
				Shredr.vent.on('stage:thumbclicked:fadeout', this.fadeOut.bind(this));
				Shredr.vent.on('stage:kickerback:clicked', this.fadeIn.bind(this));
			},

			template: WelcomebackviewTmpl,

			/* ui selector cache */
			ui: {},

			/* Ui events hash */
			events: {},

			serializeData : function () {
				var user = Shredr.user ? Shredr.user.toJSON() : null;
				if ( user.notifications ) {
					user.notCount = user.notifications.length;
					user.hasNotifications = user.notifications.length > 0;
				}

				if ( user ) {
					return {user : user};
				} else {
					return {
						user : {
							username : 'yo'
						}
					};
				}
			},

			fadeOut : function() {
				
				var shouldFade = Shredr.request('stage:thumbclicked:shouldfade');

				if ( shouldFade ) { this.$el.fadeOut(); }
			},

			fadeIn : function() {
				this.$el.fadeIn();
			}
		});

	});
