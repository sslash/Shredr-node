define([
	'backbone',
	'hbs!tmpl/stage/welcomeBackView_tmpl',

	'views/modal/notificationsModal',

	'models/shred'
	],
	function( Backbone, WelcomebackviewTmpl, NotificationModal, Shred ) {
		'use strict';

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({

			className: 'col-sm-6 half half-box stage-box clear-marg box-inner',

			initialize: function() {
				this.listenTo(Shredr.user, 'change:notifications', this.render);
				this.listenTo(Shredr.user, 'notification:deleted:success', this.render);
				Shredr.vent.on('stage:thumbclicked:fadeout', this.fadeOut.bind(this));
				Shredr.vent.on('stage:kickerback:clicked', this.fadeIn.bind(this));
			},

			template: WelcomebackviewTmpl,

			/* ui selector cache */
			ui: {},

			/* Ui events hash */
			events: {
				'click [data-event="notification"]' : '__notificationClicked'
			},

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

			__notificationClicked : function (e) {
				e.preventDefault();
				var view = new NotificationModal();
				Shredr.modal.show(view);
				this.listenTo(view, 'message:canceled', this.modalClosed);
			},

			modalClosed : function () {
				Shredr.modal.close();
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
