define([
	'backbone',
	'hbs!tmpl/shredroom/preview_tmpl'
],
function( Backbone, PreviewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
		className : 'upload-wrap',

		initialize: function() {
			console.log("initialize a Preview ItemView");
		},
		
    	template: PreviewTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
