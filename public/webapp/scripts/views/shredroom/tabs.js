define([
	'backbone',
	'hbs!tmpl/shredroom/tabs_tmpl',
	'models/tabGenerator',
],
function( Backbone, TabsTmpl ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
		className : 'sr-region-inner',

		initialize: function() {
			console.log("initialize a Tabs ItemView");
		},
		
    	template: TabsTmpl,
        

    	/* ui selector cache */
    	ui: {},

		events : {
			'click .arrow_box' : '__arrowClicked'
		},

		__arrowClicked : function() {
			this.trigger('arrow:event:click');
		},

		/* on render callback */
		onRender: function() {
			this.tabsGen = this.$('.tabsArea').tabGenerator({notes : $('.notes')});
		}
	});

});
