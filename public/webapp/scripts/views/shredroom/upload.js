define([
	'backbone',
	'hbs!tmpl/shredroom/upload_tmpl'
],
function( Backbone, UploadTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
		tagName : 'div',
		className : 'modal-flat',

		initialize: function() {
			console.log("initialize a Upload ItemView");
		},
		
    	template: UploadTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
