define([
	'backbone',
	'components/uploadComponent',
	'components/autocompleteComponent',
	'hbs!tmpl/shredroom/upload_tmpl',
	'autocomplete'
	],
	function( Backbone, UploadComponent, AutocompleteComponent, UploadTmpl ) {
		'use strict';

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
			className : 'modal-flat widest',

			initialize: function(options) {
				this.model = options.model;
				this.listenTo(this.model, 'sync', this.modelSynced);
				this.listenTo(this.model, 'error', this.modelSyncFailed);
				this.vent = options.vent;
			},

			template: UploadTmpl,

			ui : {
				fullView : '[data-region="fullview"]',
				thumbView : '[data-region="thumbview"]'
			},

			events: {
				'submit form' 	: '__uploadFormSubmitted',
				'click a' 		: '__closeModalClicked',
				'click [data-event="addTabs"]' : '__addTabsClicked',
				'click [data-event="showUpload"]' : '__showUploadClicked',
				'change input[name="optionsRadios"]' : '__radioschanged'
			},

			onRender: function() {
				// Youtube Impl
				//window.addEventListener("message", this.receiveIframeMessage.bind(this), false);

				// render upload component
				setTimeout(function() {
					this.uploadComponent = new UploadComponent({
						fileUpload : true,
						fileDrop : true,
						el : '[data-region="upload"]'
					});
					this.uploadComponent.show();
				}.bind(this), 200);

				this.shredTagsAC = new AutocompleteComponent({
					$el : this.$('[data-event="shred-tags-input"]'),
					$tagsRegion : this.$('[data-region="shred-tags"]'),
					source : 'shreds',
					allowNewKeys : true
				});

				this.gearTagsAC = new AutocompleteComponent({
					$el : this.$('[data-event="gear-tags-input"]'),
					$tagsRegion : this.$('[data-region="gear-tags"]'),
					source : 'gear',
					allowNewKeys : true
				});
			},

			saveShredSuccess : function (res) {
				this.uploadComponent.trigger('file:upload', this.model.getUploadUrl());
			},

			// EVENTS

			__radioschanged : function (e) {
				if ( e.currentTarget.value === 'Jam' ) {
					this.$('[data-region="jamtrack"]').fadeIn();
					this.jamtrackTagsAC = new AutocompleteComponent({
						$el : this.$('[data-event="jt-tags-input"]'),
						$tagsRegion : this.$('[data-region="jt-tags"]'),
						source : 'jamtracks',
						maxLimit : 1
					});
				}
			},

			__closeModalClicked : function(e) {
				e.preventDefault();
				this.trigger('close:event:click');
			},

			__uploadFormSubmitted : function(e) {
				e.preventDefault();
				var title = this.$('#shred-title').val(),
				desc = this.$('#shred-description').val(),
				type = $('input[name="optionsRadios"]:checked').val();


				this.model.set({
					title : title,
					description : desc,
					shredTags : this.shredTagsAC.getKeys(),
					gearTags : this.gearTagsAC.getKeys(),
					jamtrackTag : this.jamtrackTagsAC ? this.jamtrackTagsAC.getKeys() : null,
					type : type
				}, {validate : true});


				if ( !this.model.validationError && this.uploadComponent.fileAdded() ){
					this.model.save({}, {success: this.saveShredSuccess.bind(this)});
				} else {
					console.log('Failed to save shred');
				}
			},

			__addTabsClicked : function () {
				this.vent.trigger('tabsView:click:open', this.model);
				this.ui.fullView.css({'display': 'none'});
				this.ui.thumbView.css({'display': 'block'});
				this.$el.css({position: 'fixed'});
				this.$el.animate({
					width: '100px',
					height: '100px',
					bottom: '0px',
					right: '0px'
				}, 'fast');
			},

			/**
			* Called when in tabs view
			*/
			__showUploadClicked : function () {
				this.vent.trigger('tabsView:click:close', this.model);
				this.ui.fullView.css({'display': 'block'});
				this.ui.thumbView.css({'display': 'none'});
				this.$el.css({
					position: 'inherit',
					width: 'inherit',
					height: 'inherit',
					bottom: 'inherit',
					right: 'inherit'
				}, 'fast');
			},

			// TODO:
			// Fix this so that it saves model to server
			saveShred : function() {
				// this.model.save();
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


	/**
	* Youtube impl
*
	/*
	* Received message back from youtube (iframe js script)
	*
	*  The message includes:
	* event : {"youtubeUrl":"http://youtu.be/v_ck-cNNKxU",
	*          "youtubeId":"v_ck-cNNKxU"};
	*
	* These attributes are saved on the model, and must be used to
	* show the video instead of the button after the upload is made.
	*
	receiveIframeMessage : function(event) {
		event.preventDefault();
		console.log('Got data from iframe!');
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

	// Sends message to save the video to youtube
	__uploadFormSubmitted : function(e) {
		e.preventDefault();
		var title = this.$('#shred-title').val(),
		desc = this.$('#shred-description').val(),
		type = $('input[name="optionsRadios"]:checked').val();


		this.model.set({
			title : title,
			description : desc,
			tags : this.tags,
			type : type
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
	*/
