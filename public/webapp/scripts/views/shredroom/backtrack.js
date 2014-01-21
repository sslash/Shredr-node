define([
	'backbone',
	'hbs!tmpl/shredroom/backtrack_tmpl'
],
function( Backbone, BacktrackTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
		className : 'sr-region-inner',

		initialize: function() {
			console.log("initialize a Backtrack ItemView");
		},
		
    	template: BacktrackTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
