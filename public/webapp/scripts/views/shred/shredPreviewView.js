define([
	'backbone',
	'hbs!tmpl/shred/shredPreview_tmpl',
],
function( Backbone, tmpl) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		template : tmpl,

		initialize: function(options) {
			this.model.fetch();	
		}
	});

});
