define([
	'backbone',
	'models/shred'
],
function( Backbone, Shred ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		url : 'api/shreds',

		model: Shred
		
	});
});
