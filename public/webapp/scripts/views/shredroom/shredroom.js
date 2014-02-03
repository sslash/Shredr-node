define([
	'backbone',
	'models/shred',

	// Views
	'views/shredroom/resources',
	'views/shredroom/tabs',
	'views/shredroom/upload',
	'views/shredroom/backtrack',
	'views/shredroom/preview',

	'hbs!tmpl/shredroom/shredroom_tmpl'
],
function( Backbone, Shred, ResourcesView, TabsView,
			UploadView, BacktrackView, PreviewView, ShredroomTmpl  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		tagName : 'section',
		className : 'shredroom',

		initialize: function() {
			console.log("initialize a Shredroom Layout");
			this.model = new Shred();
			this.vent = new Backbone.Wreqr.EventAggregator();
			this.vent.on('shredroom:model:uploaded', this.shredUploaded.bind(this));
		},
		
    	template: ShredroomTmpl,    	

    	/* Layout sub regions */
    	regions: {
    		resources 	: '#resources-region',
    		tabs 		: '#tabs-region',
    		upload      : '#upload-region',
    		backtrack	: '#backtrack-region',
    		preview 	: '#preview-region'
    	},

    	/* ui selector cache */
    	ui: {
    		resource 	: '#resources-region',
    		tabs 		: '#tabs-region',
    		buttons  	: '#buttons',
    		uploadBtn   : '#upload',
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
				this.listenTo(this.backtrackView, 'arrow:event:click', 
				this.arrowClicked.bind(this, this.ui.backtrack, {'left':'-2200'}));
				this.backtrack.show(this.backtrackView);
			}

			this.showTransover(this.ui.backtrack, {'left' : '0'});
		},

		showTransover : function(container, opts) {
			this.ui.buttons.fadeOut();
			container.show();
			container.animate(opts, 'slow');
		},

		__uploadClicked : function() {
			if ( !this.UploadView ) {
				this.uploadView = new UploadView({model : this.model, vent : this.vent});
				this.upload.show(this.uploadView);
				this.listenTo(this.uploadView, 'close:event:click', this.uploadModalClosed);
			}

			this.ui.buttons.fadeOut();
			this.ui.upload.fadeIn();
		},

		__tabsClicked : function() {
			if ( !this.tabsView ) {
				this.tabsView = new TabsView();
				this.listenTo(this.tabsView, 'arrow:event:click', 
				this.arrowClicked.bind(this, this.ui.tabs, {'bottom':'-2200'}));
				this.tabs.show(this.tabsView);
			}
			this.showTransover(this.ui.tabs, {'bottom' : '0'});
		},

		__resourcesClicked : function() {
			if (!this.resourcesView) {
				this.resourcesView = new ResourcesView();
				this.listenTo(this.resourcesView, 'arrow:event:click', 
					this.arrowClicked.bind(this, this.ui.resource, {'right':'-2200'}));

				this.resources.show(this.resourcesView);
			}

			this.showTransover(this.ui.resource, {'right' : '0'});
		},

		arrowClicked : function ( container, opts) {
			container.animate(opts, 'slow');
			this.showButtons();
		},

		uploadModalClosed : function() {
			this.ui.upload.fadeOut();
			this.showButtons();
		},

		showButtons : function () {
			this.ui.buttons.fadeIn();
		},

		shredUploaded : function() {
			this.uploadModalClosed();
			this.previewView = new PreviewView();
			this.ui.uploadBtn.hide();
			this.preview.show(this.previewView);
		}
	});

});
