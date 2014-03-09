define([
	'backbone',
	'hbs!tmpl/profile/profileLayout_tmpl',
	'hbs!tmpl/stage/stageKicker_tmpl',

	// views
	'views/stage/stageKicker',
	'views/profile/editProfileView',
	'views/modal/messageModal',
	'views/modal/okMessageModal',

	// models
	'models/shred',

	// libs
	'libs/youtubeplayer'


	],
	function( Backbone, ProfileTmpl, StageKickerTmpl, StageKickerView,
			EditProfileView, MessageModalView, OkMessageModalView, Shred, Youtubeplayer) {
		'use strict';

		/* Return a Layout class definition */
		return Backbone.Marionette.Layout.extend({
			className : 'container',

			initialize: function() {
				if ( this.model.get('id') === Shredr.user.get('_id')) {
					this.model.set({isUser : true});
				}
				this.listenTo(this.model, 'change', this.render);
				this.model.fetch();
			},

			template: ProfileTmpl,

			ui: {
				kicker : '#sr-stage-kicker',
				contentBtns : '[data-model="content-btns"]',

				// iframe content
				shredDesc : '[data-model="shred-desc"]',
				shredTitle : '[data-model="shred-title"]',
				youtubePreview : '[data-model="youtube-preview"]',

			},

		regions : {},

		/* Ui events hash */
		events: {
			'click [data-event="edit-btn"]' : '__editClicked',
			'click [data-event="youtube-img"]' : '__videoImgClicked',
			'mouseover [data-event="thumb-hover"]' : '__thumbmouseover',
			'mouseout [data-event="thumb-hover"]' : '__thumbmouseout',
			'click [data-event="fullscreen-shred"]' : '__fullscreenShredClicked',
			'click [data-event="msg"]' : '__messageClicked',
			'click [data-event="fan"]' : '__becomeFanCLicked'
		},

		/* on render callback */
		onRender: function () {
			if ( this.model.get('birthdate') ) {
				this.model.setDateString();
			}
			this.ui.kicker.append( StageKickerTmpl({
				kicker : 'Profile Kicker',
				headline : 'Profile Headline'
			}) );
		},

		modalClosed : function () {
			Shredr.modal.close();
			this.$el.css({'opacity' : '1'});
		},

		swapAndPlayVideo : function (shred) {
			this.ui.youtubePreview.hide();
			if ( !this.player ) {
				this.player = new Youtubeplayer('player', new Shred(this.model.get('shreds')[0]));
				this.player.onYouTubeIframeAPIReady();
			} else {
				this.player.changeVideo(shred);	
			}
		},

		fadeOut : function () {
			this.$el.css({'opacity' : '0.1'});
		},

		addFaneeSuccess : function () {
			var view = new OkMessageModalView({message : msg});
			var msg = this.model.get('username') + ' was added to fanees list!';
			Shredr.modal.show(view.render().el);
			this.listenTo(view, 'message:ok', this.modalClosed);
		},

		// EVENTS

		__becomeFanCLicked : function () {
			this.listenToOnce(Shredr.user, 'fane:add', this.addFaneeSuccess);
			Shredr.user.addFan(this.model.get('id'));
		},

		__messageClicked : function () {
			this.fadeOut();
			var view = new MessageModalView({model : this.model});
			this.listenTo(view, 'message:canceled', this.modalClosed);
			Shredr.modal.show(view);
		},

		__thumbmouseover : function (e) {
			$(e.currentTarget).find('[data-model="content-btns"]').show();
		},

		__thumbmouseout : function (e) {
			$(e.currentTarget).find('[data-model="content-btns"]').hide();
		},

		__videoImgClicked : function (e) {
			var index = $(e.currentTarget).attr('data-index');
			index = parseInt(index);
			var shred = new Shred(this.model.get('shreds')[index]);

			// change headers
			this.ui.shredDesc.text(shred.get('description'));
			this.ui.shredTitle.text(shred.get('title'));
			
			// change and start playing video
			this.swapAndPlayVideo(shred);
		},

		__fullscreenShredClicked : function (e) {
			var shredId = $(e.currentTarget).attr('data-model');
			Shredr.router.navigate("/shred/" + shredId, {trigger: true});
		},

		__editClicked : function() {
			this.fadeOut();
			var view = new EditProfileView({model : this.model, forceDna : true});
			this.listenTo(view, 'editProfile:canceled', this.modalClosed);
			this.listenTo(view, 'editProfile:success', this.modalClosed);
			Shredr.modal.show(view);
		}
	});

});
