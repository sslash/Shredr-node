define([
	'backbone',
	'hbs!tmpl/nav/main_tmpl'
],
function( Backbone, NavMainTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a NavMain ItemView :" + window.Shredr);
		},
		
    	template: NavMainTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
