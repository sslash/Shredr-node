define([
	'backbone',
	'hbs!tmpl/stage/stage_tmpl',

	// Views
	'views/stage/stageKicker',
	'views/stage/welcomeBackView',
	'views/stage/thumbsColl'
],
function( Backbone, StageTmpl, StageKickerView, WelcomeBackView,ThumbsCollView ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		className : 'container',


		initialize: function() {
			console.log("initialize a Stage Layout");
		},
		
		template: StageTmpl,

		/* Layout sub regions */
		regions: {
			kicker : '#sr-stage-kicker',
		},

		/* ui selector cache */
		ui: {
			firstRow : '#sr-stage-firstrow .row'
		},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {
			this.kicker.show( new StageKickerView() );
			this.ui.firstRow.append( new WelcomeBackView().render().el );
			this.ui.firstRow.append( new ThumbsCollView().render().el );
		}
	});

});
