define([
	'backbone',
	'hbs!tmpl/stage/profiles_layout_tmpl',
],
function( Backbone, ProfileTmpl) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a Profiles Layout");
		},
		
		template: ProfileTmpl,

		/* Layout sub regions */
		regions: {
		},

		/* ui selector cache */
		ui: {
		},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {
		}
	});

});
