define([
	'backbone',
	'models/battle'
],
function( Backbone, Battle ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		url : 'api/battles',
		
		initialize: function() {
			console.log("initialize a Battlescollection collection");
		},

		model: Battle
		
	});
});
