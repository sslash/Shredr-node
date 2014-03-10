define([
	'backbone',
	'hbs!tmpl/shredroom/theorySection'
],
function( Backbone, tmpl  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		template : tmpl,
		className : 'sr-background',

		initialize: function() {
			console.log('hei')
		}
    });
});
