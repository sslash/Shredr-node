define([
	'backbone',
	'models/shred'
],
function( Backbone, Shred ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		url : 'api/shreds',

		model: Shred,

		query : function (q) {
			var url = this.url + '/query', that = this;
			for ( var key in q ) {
				if (q.hasOwnProperty(key)) {
					url += '?' + key + '=' + q[key];
				}
			}

			$.get(url)
			.done(function(res) {
				that.reset(res);
			})
			.fail(function(jqXHR, textStatus, errorThrown){
				console.log('failed to fetcH: ' + url + ', error: ' + textStatus);
			});
		}
		
	});
});
