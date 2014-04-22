/* globals $ */
define([
	'backbone',

	'views/shredroom/scalesTheory',
	'views/shredroom/comingSoon',
	'views/shredroom/jamtrack',
	'hbs!tmpl/shredroom/resources'
],
function( Backbone, ScalesTheoryView, ComingSoonView, BacktrackView, tmpl ) {
    'use strict';

	return Backbone.Marionette.Layout.extend({

		template : tmpl,
		className : 'sr-background',

		events : {
			'click [data-event="category-click"] li' : '__categoryClicked',
			'click [data-event="back-btn"]' : '__backClicked',
			'click [data-region="jamtrack"]': '__jamtrackClicked'
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
				default:
					this.renderSubView(ComingSoonView);
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

		__jamtrackClicked : function () {
			this.renderSubView(BacktrackView);
		},

		__backClicked : function () {
			Backbone.history.history.back();
		},

		__categoryClicked : function (e) {
			e.preventDefault();
			e.stopPropagation();
			this.createSubview($(e.currentTarget).attr('data-model'));
		}
    });
});
