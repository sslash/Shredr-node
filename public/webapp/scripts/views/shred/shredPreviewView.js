define([
	'backbone',
	'hbs!tmpl/shred/shredPreview_tmpl',
	'hbs!tmpl/stage/stageKicker_tmpl',

	// libs
	'libs/youtubeplayer',

	// views
	'views/stage/thumbView',
	'views/shred/shredPreviewMetaView',

	// models
	'models/shred',

	// collections
	'collections/shredsCollection'

],
function( Backbone, tmpl, StageKickerTmpl, Youtubeplayer, ThumbView,
		ShredPreviewMetaView, Shred, ShredsCollection) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({
		className : 'container',
		template : tmpl,
		thumbViews : [],

		ui: {
			kicker : '#sr-stage-kicker',
			shredsList : '[data-section="shreds-list"]'
		},

		regions : {
			shredMeta : '[data-section="shred-meta"]'
		},

		initialize: function(options) {
			this.listenTo(this.model, 'change:youtubeId', this.renderYoutube);
			this.listenTo(this.model, 'change:type', this.fetchQuery);
			this.listenTo(this.model, 'change:title', this.renderShredMeta);

			this.collection = new ShredsCollection();
			this.listenTo(this.collection, 'reset', this.renderCollection);
			this.model.fetch();
		},

		onRender : function () {
			this.ui.kicker.append( StageKickerTmpl({
				kicker : 'Profile Kicker',
				headline : 'Profile Headline'
			}));

			this.renderYoutube();
		},

		renderYoutube : function () {
			if ( !this.player && this.model.get('youtubeId')) {
				this.player = new Youtubeplayer('player', this.model);
				this.listenTo(this.player, 'player:ready', this.playerReady);
				this.player.onYouTubeIframeAPIReady();
			}
		},

		renderShredMeta : function () {
			this.shredMeta.show(new ShredPreviewMetaView( {
				model : this.model,
				parent : this,
				player : this.player
			}));
		},

		fetchQuery : function () {
			this.collection.query({type : this.model.get('type')});
		},

		renderCollection : function () {
			this.collection.models.forEach(function(shred) {
				var view = new ThumbView({model : shred, mustFadeOut : false, className : 'stage-block'});
				this.thumbViews.push(view);
				this.ui.shredsList.append(view.render().el);
			}.bind(this));
		},

		playerReady : function () {
			this.playerIsReady = true;
		},

		getDuration : function () {
			return this.playerIsReady ? this.player.getDuration() : null;
		}
	});

});
