define([
	'backbone',
	'models/shred'
],
function( Backbone, Shred ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		url : 'api/shreds',
		
		initialize: function() {
			console.log("initialize a Shredscollection collection");
		},

		model: Shred
		
	});
});
