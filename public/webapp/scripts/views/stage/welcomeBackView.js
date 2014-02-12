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
				console.log("initialize a Welcomebackview ItemView");
				Shredr.vent.on('stage:thumbclicked:fadeout', this.fadeOut.bind(this));
			},

			fadeOut : function() {
				this.faded = !this.faded;
				if ( this.faded)
					this.$el.fadeOut();
				else
					this.$el.fadeIn();
			},
			template: WelcomebackviewTmpl,

			/* ui selector cache */
			ui: {},

			/* Ui events hash */
			events: {
			}
		});

	});
