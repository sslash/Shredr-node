define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		urlRoot : 'api/conversation/',
		
		initialize: function() {
		}
	});
});
