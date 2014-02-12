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
			}
		},
		
		template: ThumbviewTmpl,
        
        fadeOut : function() {
        	this.faded = !this.faded;
        	if ( this.faded)
        		this.$el.fadeOut();
        	else
        		this.$el.fadeIn();
        },

		/* ui selector cache */
		ui: {},

		/* Ui events hash */
		events: {
			'click img' : '__imgClicked'
		},

		__imgClicked : function() {
			console.log("trigger");
			Shredr.vent.trigger('stage:thumbclicked:fadeout', this.model);

			// $("input").toggle(function() {
			// 	clearTimeout(timer);
			// }, function() {
			// 	rotate();
			// });
		},

		/* on render callback */
		onRender: function() {}
	});

});
