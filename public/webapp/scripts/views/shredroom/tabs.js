define([
	'backbone',
	'hbs!tmpl/shredroom/scale_tabs_tmpl',
	'hbs!tmpl/shredroom/create_shred_tabs_tmpl',
	'models/tabGenerator',
],
function( Backbone, ScaleTmpl, NormalTmpl ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
		className : 'sr-region-inner',

    	template: ScaleTmpl,

		initialize : function (options) {
			options = options || {};
			if ( options.template ) {
				this.otherTmpl = NormalTmpl;
			}
		},

    	/* ui selector cache */
    	ui: {},

		events : {
			'click .arrow_box' : '__arrowClicked'
		},

		getTemplate : function () {
			return this.otherTmpl || this.template;
		},

		__arrowClicked : function() {
			this.trigger('arrow:event:click');
		},

		/* on render callback */
		onRender: function() {
			this.tabsGen = this.$('.tabsArea').tabGenerator({notes : this.$('.notes')});
		},

		getTabs : function () {
			return this.tabsGen.getTabs();
		}
	});

});
