define([
	'backbone',
	'views/shredroom/resources',
	'hbs!tmpl/shredroom/shredroom_tmpl'
],
function( Backbone, ResourcesView, ShredroomTmpl  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		tagName : 'section',
		className : 'shredroom',

		initialize: function() {
			console.log("initialize a Shredroom Layout");
		},
		
    	template: ShredroomTmpl,
    	

    	/* Layout sub regions */
    	regions: {
    		resources : '#resources-region'
    	},

    	/* ui selector cache */
    	ui: {
    		resource : '#resources-region',
    		buttons  : '#buttons'
    	},

		/* Ui events hash */
		events: {
			'click #resources' : '__resourcesClicked'
		},

		__resourcesClicked : function() {
			this.resources.show(new ResourcesView());
			this.ui.resource.show();
			this.ui.buttons.hide();
			this.ui.resource.animate({'right' : '0'}, 'slow');
		}
	});

});
