define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		url : 'api/shreds/',
		
		initialize: function() {
			console.log("initialize a Shred model");
		},

		defaults: {},

		validate : function (attrs) {
			if ( !attrs.title || attrs.title.length === 0 ){
				return 'Title must be included';
			}
			if ( !attrs.description || attrs.description.length === 0 ){
				return 'Description must be included';
			}
		},

    });
});
