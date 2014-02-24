define([
	'backbone',
	'hbs!tmpl/stage/thumbView_tmpl'
],
function( Backbone, ThumbviewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
		className: 'col-sm-6 stage-block',

		initialize: function(options) {
			if ( options.className ) {
				this.className = options.className;
			}

			this.mustFadeOut = options.mustFadeOut;
			if( this.mustFadeOut === true ) {
				Shredr.vent.on('stage:thumbclicked:fadeout', this.fadeOut.bind(this));
				Shredr.vent.on('stage:kickerback:clicked', this.fadeIn.bind(this));
			}
		},
		
		template: ThumbviewTmpl,
        
        fadeOut : function() {
        	// If the stage is in preview mode already, dont fade out.
        	var shouldFade = Shredr.request('stage:thumbclicked:shouldfade');
        	if ( shouldFade ) { this.$el.fadeOut(); }
        },

        fadeIn : function() {
        	this.$el.fadeIn();
        },

		/* ui selector cache */
		ui: {},

		/* Ui events hash */
		events: {
			'click a[data-event="user-clicked"]' : '__userClicked',
			'click img[data-event="youtube-img"]' : '__imgClicked'
		},

		__imgClicked : function() {
			Shredr.vent.trigger('stage:thumbclicked:fadeout', this.model);

			// $("input").toggle(function() {
			// 	clearTimeout(timer);
			// }, function() {
			// 	rotate();
			// });
		},

		__userClicked : function (e) {
			e.preventDefault();
			e.stopPropagation();
			Shredr.router.navigate('#shredders/' + this.model.get('user').id, {trigger : true});
		}
	});

});
