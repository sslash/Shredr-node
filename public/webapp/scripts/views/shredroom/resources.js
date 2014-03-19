/* globals $ */
define([
	'backbone',

	'views/shredroom/scalesTheory',
	'hbs!tmpl/shredroom/theorySection'
],
function( Backbone, ScalesTheoryView, tmpl ) {
    'use strict';

	return Backbone.Marionette.Layout.extend({

		template : tmpl,
		className : 'sr-background',

		events : {
			'click [data-event="category-click"] li' : '__categoryClicked'
		},

		ui : {
			theoryContent : '[data-region="theory-content"]'
		},

		regions : {
			theoryContent : '[data-region="theory-content"]'
		},

		createSubview : function (category) {
			switch (category) {
				case 'scales':
					this.renderSubView(ScalesTheoryView);
					break;
			}
		},

		renderSubView : function (View) {
			this.ui.theoryContent.fadeOut('fast', function () {
				this.theoryContent.show(new View());
					this.ui.theoryContent.fadeIn('fast');
			}.bind(this));
		},

		// EVENTS

		__categoryClicked : function (e) {
			e.preventDefault();
			e.stopPropagation();
			this.createSubview($(e.currentTarget).attr('data-model'));
		}
    });
});
