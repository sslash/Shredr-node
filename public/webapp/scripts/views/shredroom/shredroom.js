define([
	'backbone',
	'views/shredroom/resources',
	'views/shredroom/tabs',
	'hbs!tmpl/shredroom/shredroom_tmpl'
],
function( Backbone, ResourcesView, TabsView, ShredroomTmpl  ) {
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
    		resources 	: '#resources-region',
    		tabs 		: '#tabs-region'
    	},

    	/* ui selector cache */
    	ui: {
    		resource 	: '#resources-region',
    		tabs 		: '#tabs-region',
    		buttons  	: '#buttons'
    	},

		/* Ui events hash */
		events: {
			'click #resources' 	: '__resourcesClicked',
			'click #tabs'		: '__tabsClicked'
		},

		__tabsClicked : function() {
			if ( !this.tabsView ) {
				this.tabsView = new TabsView(); 
				this.listenTo(this.tabsView, 'arrow:event:click', this.tabsArrowClicked.bind(this));
				this.tabs.show(this.tabsView);
			}

			this.ui.tabs.show();
			this.ui.buttons.hide();
			this.ui.tabs.animate({'bottom' : '0'}, 'slow');

		},

		__resourcesClicked : function() {
			if (!this.resourcesView) {
				this.resourcesView = new ResourcesView();
				this.listenTo(this.resourcesView, 'arrow:event:click', this.resourcesArrowClicked.bind(this));
				this.resources.show(this.resourcesView);
			}

			this.ui.resource.show();
			this.ui.buttons.hide();
			this.ui.resource.animate({'right' : '0'}, 'slow');
		},

		tabsArrowClicked : function () {
			this.ui.tabs.animate({'bottom' : '-1000px'}, 'slow');
			this.showButtons();
		},

		resourcesArrowClicked : function () {
			this.ui.resource.animate({'right' : '-2200px'}, 'slow');
			this.showButtons();
		},

		showButtons : function () {
			this.ui.buttons.show();
		}


	});

});
