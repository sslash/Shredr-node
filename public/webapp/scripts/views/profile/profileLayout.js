define([
	'backbone',
	'hbs!tmpl/profile/profileLayout_tmpl',
	'hbs!tmpl/stage/stageKicker_tmpl',

	// views
	'views/stage/stageKicker',
	'views/profile/editProfileView',

	// models
	'models/shred',

	// libs
	'libs/youtubeplayer'


],
function( Backbone, ProfileTmpl, StageKickerTmpl, StageKickerView, EditProfileView,
		  Shred, Youtubeplayer) {
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
			dataFadeable : '[data-fadeable="true"]',

			// iframe content
			shredDesc : '[data-model="shred-desc"]',
			shredTitle : '[data-model="shred-title"]'
		},

		regions : {},

		/* Ui events hash */
		events: {
			'click [data-event="edit-btn"]' : '__editClicked',
			'click [data-event="youtube-img"]' : '__videoImgClicked'
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
			if ( this.model.get('shreds') ) {
				this.player = new Youtubeplayer('player', new Shred(this.model.get('shreds')[0]));
				this.player.onYouTubeIframeAPIReady();
			}
		},

		editProfileClosed : function () {
			Shredr.modal.close();
			this.$el.css({'opacity' : '1'});
		},

		__videoImgClicked : function (e) {
			var index = $(e.currentTarget).attr('data-index');
			index = parseInt(index);
			var shred = new Shred(this.model.get('shreds')[index]);

			// change headers
			this.ui.shredDesc.text(shred.get('description'));
			this.ui.shredTitle.text(shred.get('title'));
			
			// change and start playing video
			this.player.changeVideo(shred);
		},

		__editClicked : function() {
			this.$el.css({'opacity' : '0.1'});
			var view = new EditProfileView({model : this.model, forceDna : true});
			this.listenTo(view, 'editProfile:canceled', this.editProfileClosed);
			this.listenTo(view, 'editProfile:success', this.editProfileClosed);
			Shredr.modal.show(view);
		}
	});

});
