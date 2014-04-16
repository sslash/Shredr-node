define([
	'backbone',
	'hbs!tmpl/shredroom/upload_tmpl',
	'autocomplete'
	],
	function( Backbone, UploadTmpl ) {
		'use strict';

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
			className : 'modal-flat',
			tags : [],

			initialize: function(options) {
				this.model = options.model;
				this.listenTo(this.model, 'sync', this.modelSynced);
				this.listenTo(this.model, 'error', this.modelSyncFailed);
				this.vent = options.vent;
				this.debug = true;
			},

			template: UploadTmpl,

			ui : {
				eqTags : '#eq-tags',
				shredTags : '#shred-tags',
				eqTagsArea : '[data-region="eq-tags"]',
				shredTagsArea : '[data-region="shred-tags"]',
				fullView : '[data-region="fullview"]',
				thumbView : '[data-region="thumbview"]'
			},

			events: {
				'submit form' 	: '__uploadFormSubmitted',
				'click a' 		: '__closeModalClicked',
				'keypress [data-event="tags-input"]' : '__keypressTags',
				'click [data-event="addTabs"]' : '__addTabsClicked',
				'click [data-event="showUpload"]' : '__showUploadClicked'
			},

			onRender: function() {
				window.addEventListener("message", this.receiveIframeMessage.bind(this), false);
				this.ui.eqTags.autocomplete({
					source : this.autocompleteTags,
					select: this.__tagSelected.bind(this)
				});
			},

			onShow : function() {
				this.initDropListeners();
			},

			initDropListeners : function() {
				var dropZone = document.getElementById('file-drop');
				dropZone.addEventListener('dragover', this.__fileDragover, false);
				dropZone.addEventListener('dragleave', this.__fileLeave, false);
				dropZone.addEventListener('dragenter', this.__fileEnter, false);
				dropZone.addEventListener('drop', this.__fileDropped, false);
			},

			pushTag : function (ui, input, value) {
				this.tags.push(value);
				var html = '<span class="font-xsmall">' + value + '</span>';
				ui.append(html);
				input.val('');
				return false;
			},

			// TODO:
			// Either send the file to the child frame's upload form
			// Or move the file drag UI into the youtube iframe.
			__fileDropped : function(evt) {
				// evt.stopPropagation();
				// evt.preventDefault();

				//var files = evt.dataTransfer.files; // FileList object.

				// files is a FileList of File objects. List some properties.
				//    var output = [];
				//    for (var i = 0, f; f = files[i]; i++) {
				//    	output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
				//    		f.size, ' bytes, last modified: ',
				//    		f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
				//    		'</li>');
				//    }
				//    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
			},

			__fileLeave : function(evt) {
				var $target = $(evt.currentTarget);
				$target.removeClass('highlight')
			},

			__fileEnter : function(evt) {
				var $target = $(evt.currentTarget);
				if ( !$target.hasClass('highlight')) {
					$target.addClass('highlight')
				}
			},

			__fileDragover : function(evt) {
				evt.stopPropagation();
				evt.preventDefault();
				evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
			},

			__closeModalClicked : function(e) {
				e.preventDefault();
				this.trigger('close:event:click');
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

			__keypressTags : function (e) {
				if ( e.keyCode === 13 ) {
					var $curr = $(e.currentTarget);
					if ( $curr.attr('id') === 'shred-tags' ) {
						this.pushTag(this.ui.shredTagsArea, this.ui.shredTags, $curr.val());
					} else {
						this.pushTag(this.ui.eqTagsArea, this.ui.eqTags, $curr.val());
					}
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

			// __keypressEqTags : function (e) {
			// 	if ( e.keyCode === 13 ) {
			// 		this.pushTag(this.ui.eqTagsArea, this.ui.eqTags, $(e.currentTarget).val());
			// 	}
			// },
			//
			// __keypressShredTags : function (e) {
			// 	if ( e.keyCode === 13 ) {
			// 		this.pushTag(this.ui.shredTagsArea, this.ui.shredTags, $(e.currentTarget).val());
			// 	}
			// },
			__tagSelected : function(event, ui, val) {
				this.pushTag(this.ui.eqTagsArea, this.ui.eqTags, ui.item.label);
			},

			/*
			* Received message back from youtube (iframe js script)
			*
			*  The message includes:
			* event : {"youtubeUrl":"http://youtu.be/v_ck-cNNKxU",
			*          "youtubeId":"v_ck-cNNKxU"};
			*
			* These attributes are saved on the model, and must be used to
			* show the video instead of the button after the upload is made.
			*/
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
			},

			autocompleteTags : [
			'Gibson Les Paul',
			'Fender Stratocaster',
			'C-major Scale',
			'Marshall JCM-2000',
			'C-sharp major five'
			]
		});
	});
