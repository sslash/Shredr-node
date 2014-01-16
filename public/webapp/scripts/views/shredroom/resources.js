define([
	'backbone',
	'hbs!tmpl/shredroom/resources_tmpl'
],
function( Backbone, ResourcesTmpl  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.ItemView.extend({

		className : 'resources-inner',
		
		initialize: function() {
			console.log("initialize a Resources Itemview");
		},
		
    	template: ResourcesTmpl,

    	/* ui selector cache */
    	ui: {}

	});

});
