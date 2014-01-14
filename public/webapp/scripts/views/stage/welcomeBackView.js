define([
	'backbone',
	'hbs!tmpl/stage/welcomeBackView_tmpl',

	'models/shred'
	],
	function( Backbone, WelcomebackviewTmpl, Shred ) {
		'use strict';

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({

			className: 'col-sm-6 stage-block',

			initialize: function() {
				console.log("initialize a Welcomebackview ItemView");
				this.model = new Shred();
				this.listenTo(this.model, 'sync', this.modelSynced);
				this.listenTo(this.model, 'error', this.modelSyncFailed);
			},

			template: WelcomebackviewTmpl,

			/* ui selector cache */
			ui: {},

			/* Ui events hash */
			events: {
				'submit form' : '__uploadFormSubmitted',
				//'submit form' : 'saveShred',
			},

			/* on render callback */
			onRender: function() {
				window.addEventListener("message", this.receiveIframeMessage.bind(this), false);
			},

			__uploadFormSubmitted : function(e) {
				e.preventDefault();
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
					var receiver = document.getElementById('receiver').contentWindow;
					receiver.postMessage(data, '*');
				} else {}
			},

			receiveIframeMessage : function(event) {
				event.preventDefault();
				console.log("message from child! " + event.data);
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

			saveShred : function(e) {
				console.log("will save shred!");
				this.model.save();
			},

			modelSyncFailed : function(err) {
				console.log("model failed to sync " + err);
			},

			modelSynced : function(model) {
				console.log("model synced! " + model);
			}

		});

	});
