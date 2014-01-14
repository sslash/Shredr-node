define([
	'backbone',
	'hbs!tmpl/stage/thumbView_tmpl'
],
function( Backbone, ThumbviewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
		className: 'col-sm-6 stage-block',

		initialize: function() {
			console.log("initialize a Thumbview ItemView");
		},
		
		template: ThumbviewTmpl,
        

		/* ui selector cache */
		ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
