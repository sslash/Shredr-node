define([
	'backbone',
	'hbs!tmpl/stage/welcomeBackView_tmpl',

	'models/shred'
	],
	function( Backbone, WelcomebackviewTmpl, Shred ) {
		'use strict';

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({

			className: 'col-sm-6 stage-block stage-welcome stage-box box-inner',

			initialize: function() {
				Shredr.vent.on('stage:thumbclicked:fadeout', this.fadeOut.bind(this));
				Shredr.vent.on('stage:kickerback:clicked', this.fadeIn.bind(this));
			},

			template: WelcomebackviewTmpl,

			/* ui selector cache */
			ui: {},

			/* Ui events hash */
			events: {},

			fadeOut : function() {
				
				var shouldFade = Shredr.request('stage:thumbclicked:shouldfade');

				if ( shouldFade ) { this.$el.fadeOut(); }
			},

			fadeIn : function() {
				this.$el.fadeIn();
			}
		});

	});
