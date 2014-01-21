define([
	'backbone',

	'models/shred',

	'views/shredroom/resources',
	'views/shredroom/tabs',
	'views/shredroom/upload',
	'views/shredroom/backtrack',


	'hbs!tmpl/shredroom/shredroom_tmpl'
],
function( Backbone, Shred, ResourcesView, TabsView,
			UploadView, BacktrackView, ShredroomTmpl  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		tagName : 'section',
		className : 'shredroom',

		initialize: function() {
			console.log("initialize a Shredroom Layout");
			this.model = new Shred();
		},
		
    	template: ShredroomTmpl,    	

    	/* Layout sub regions */
    	regions: {
    		resources 	: '#resources-region',
    		tabs 		: '#tabs-region',
    		upload      : '#upload-region',
    		backtrack	: '#backtrack-region'
    	},

    	/* ui selector cache */
    	ui: {
    		resource 	: '#resources-region',
    		tabs 		: '#tabs-region',
    		buttons  	: '#buttons',
    		upload      : '#upload-region',
    		backtrack 	: '#backtrack-region'
    	},

		/* Ui events hash */
		events: {
			'click #resources' 	: '__resourcesClicked',
			'click #tabs'		: '__tabsClicked',
			'click #upload'		: '__uploadClicked',
			'click #jamtracks'	: '__backtrackClicked'
		},

		__backtrackClicked : function () {
			if ( !this.BacktrackView ){
				this.backtrackView = new BacktrackView({model : this.model});
				this.backtrack.show(this.backtrackView);
			}

			this.ui.buttons.fadeOut();
			this.ui.backtrack.show();
		},

		__uploadClicked : function() {
			if ( !this.UploadView ) {
				this.uploadView = new UploadView({model : this.model});
				this.upload.show(this.uploadView);
				this.listenTo(this.uploadView, 'close:event:click', this.uploadModalClosed);
			}

			this.ui.buttons.fadeOut();
			this.ui.upload.fadeIn();
		},

		__tabsClicked : function() {
			if ( !this.tabsView ) {
				this.tabsView = new TabsView(); 
				this.listenTo(this.tabsView, 'arrow:event:click', this.tabsArrowClicked.bind(this));
				this.tabs.show(this.tabsView);
			}

			this.ui.tabs.show();
			this.ui.buttons.fadeOut();
			this.ui.tabs.animate({'bottom' : '0'}, 'slow');
		},

		__resourcesClicked : function() {
			if (!this.resourcesView) {
				this.resourcesView = new ResourcesView();
				this.listenTo(this.resourcesView, 'arrow:event:click', this.resourcesArrowClicked.bind(this));
				this.resources.show(this.resourcesView);
			}

			this.ui.resource.show();
			this.ui.buttons.fadeOut();
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

		uploadModalClosed : function() {
			this.ui.upload.fadeOut();
			this.showButtons();
		},

		showButtons : function () {
			this.ui.buttons.fadeIn();
		}


	});

});
