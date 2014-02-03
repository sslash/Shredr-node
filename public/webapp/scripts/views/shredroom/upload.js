define([
	'backbone',
	'hbs!tmpl/shredroom/upload_tmpl'
],
function( Backbone, UploadTmpl ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
		tagName : 'div',
		className : 'modal-flat sr-box',

		initialize: function(options) {
			console.log("initialize a Upload ItemView");
			this.model = options.model;
			this.listenTo(this.model, 'sync', this.modelSynced);
			this.listenTo(this.model, 'error', this.modelSyncFailed);
			this.vent = options.vent;

			this.debug = true;
		},
		
    	template: UploadTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {
			'submit form' 	: '__uploadFormSubmitted',
			'click a' 		: '__closeModalClicked'
		},

		onRender: function() {
			window.addEventListener("message", this.receiveIframeMessage.bind(this), false);
		},

		__closeModalClicked : function(e) {
			e.preventDefault();
			this.trigger('close:event:click');
		},

		// Sends message to save the video to youtube
		__uploadFormSubmitted : function(e) {
			e.preventDefault();
			console.log('hei')
			var title = this.$('#shred-title').val(),
				desc = this.$('#shred-description').val();

			this.model.set({
				title : title,
				description : desc
			}, {validate : true});


			if ( !this.model.validationError ){
				var data = JSON.stringify({
					title : title,
					description : desc
				});

				// Skips this part which sends the video to youTube
				if ( this.debug ) {
					this.model.set({
						youtubeUrl : '//www.youtube.com/embed/eKOpKLv7Wv8?autohide=1',
						youtubeId : 'eKOpKLv7Wv8'
					});
					this.saveShred();
				} else {
					var receiver = document.getElementById('receiver').contentWindow;
					receiver.postMessage(data, '*');
				}
			} else {}
		},

		// Received message back from youtube (iframe js script)
		receiveIframeMessage : function(event) {
			event.preventDefault();
			if ( event.data ) {					
				try {
					var data = JSON.parse(event.data);
					if ( data.youtubeUrl && data.youtubeId ) {
						this.model.set({
							youtubeUrl : data.youtubeUrl,
							youtubeId : data.youtubeId
						});
						this.saveShred();
					}
				}catch(e){}
			}
		},

		// TODO:
		// Fix this so that it saves model to server
		saveShred : function() {
			// this.model.save();
			console.log('sap')
			this.vent.trigger('shredroom:model:uploaded');
		},

		modelSyncFailed : function(err) {
			console.log("model failed to sync " + err);
		},

		modelSynced : function(model) {
			console.log("model synced! " + model);
		}
	});
});
