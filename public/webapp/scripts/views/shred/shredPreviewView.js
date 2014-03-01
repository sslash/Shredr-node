define([
	'backbone',
	'hbs!tmpl/shred/shredPreview_tmpl',
	'hbs!tmpl/stage/stageKicker_tmpl',

	// libs
	'libs/youtubeplayer',

	'models/shred'
],
function( Backbone, tmpl, StageKickerTmpl, Youtubeplayer, Shred) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({
		className : 'container',
		template : tmpl,

		ui: {
			kicker : '#sr-stage-kicker',
		},

		initialize: function(options) {
			this.model.fetch();
		},

		onRender : function () {
			this.ui.kicker.append( StageKickerTmpl({
				kicker : 'Profile Kicker',
				headline : 'Profile Headline'
			}));

			if ( !this.player ) {
				this.player = new Youtubeplayer('player', this.model);
				this.player.onYouTubeIframeAPIReady();
			}
		}
	});

});
