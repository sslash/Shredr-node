define([
	'backbone',
	'hbs!tmpl/stage/preview_tmpl',

	'views/stage/tabsPreview'
],
function( Backbone, PreviewTmpl, TabsPreviewView) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({
		className : 'stage-box preview-inner',

		initialize: function() {
			this.model.fetch();
			this.listenTo(this.model, 'change', this.populateView);
		},
		
		template: PreviewTmpl,

		/* Layout sub regions */
		regions: {
			tabs : '.tabs-preview'
		},

		/* ui selector cache */
		ui: {
			duration : '[data-model="duration"]',
			tags : '.style-tags',

			logos : '.logos .logo-xsmall',

			// imgs
			index0 : '[data-index="0"]',
			index1 : '[data-index="1"]',
			index2 : '[data-index="2"]',
			index3 : '[data-index="3"]',
			index4 : '[data-index="4"]',
			index5 : '[data-index="5"]',
			index6 : '[data-index="6"]',
			index7 : '[data-index="7"]',
			index8 : '[data-index="8"]',
			index9 : '[data-index="9"]',

			rating : '[data-model="rating"]'
		},

		/* Ui events hash */
		events: {
			'mouseenter .logos .logo-xsmall' : '__logoEntered',
			'mouseleave .logos'		: '__logoExit',
			'click .logos .logo-xsmall' : '__rateClicked'			
		},

		/* on render callback */
		onShow: function() {
			this.onYouTubeIframeAPIReady();
			this.renderTabs();
		},

		renderTabs : function (){
			this.tabs.show(new TabsPreviewView({model : this.model}));
		},


		populateView : function() {
			this.model.get('tags').forEach(function(t){
				this.ui.tags.append('<span class="font-xsmall"><strong>' + t + '<strong></span>');
			}, this);
		},

		__logoExit : function(e) {
			this.ui.logos.attr('src', 'img/icons/logo_sml_white.png');
		},

		__rateClicked : function() {
			this.model.rate(this.rateValue);
		},

		__logoEntered : function(e) {
			var $curr = $(e.currentTarget);
			var index = parseInt($curr.attr('data-index'), 10);
			this.rateValue = parseInt(index, 10) + 1;
			this.ui.rating.text(this.rateValue + '/10');

			for (var i = 0; i <= index; i ++ ) {
				var $logo = this.ui['index'+i];
				$logo.attr('src','img/icons/logo_sml-black.png' );
			}

			for ( var i = index +1; i < 10; i++ ) {
				var $logo = this.ui['index'+i];
				$logo.attr('src', 'img/icons/logo_sml_white.png');	
			}
		},

		// 3. This function creates an <iframe> (and YouTube player)
      	//    after the API code downloads.
      	onYouTubeIframeAPIReady : function() {
      		this.player = new YT.Player('player', {
      			height: '390',
      			width: '640',
      			playerVars : {
      				autoplay : 0,
      				cc_load_policy : 0,
      				controls : 0,
      				fs : 0,
      				iv_load_policy : 3,
      				modestbranding : 1,
      				rel : 0,
      				showinfo : 0,
      			},
      			videoId: this.model.get('youtubeId'),
      			events: {
      				'onReady': this.onPlayerReady.bind(this),
      				'onStateChange': this.onPlayerStateChange.bind(this)
      			}
      		});
      	},

      	// 4. The API will call this function when the video player is ready.
      	onPlayerReady : function(event) {
        	// event.target.playVideo();
        	this.renderDuration();
      	},

	      // 5. The API calls this function when the player's state changes.
	      onPlayerStateChange : function(event) {
	      	var that = this;
	        if (event.data == YT.PlayerState.PLAYING && !this.done) {
	          // setTimeout(that.stopVideo.bind(that), 6000); // This stops the player after 6 seconds
	          that.done = true;
	        }
	      },
	      
	      stopVideo : function() {
	        this.player.stopVideo();
	      },

	      renderDuration : function() {
	      	var secs = this.player.getDuration();
	      	var mins = Math.floor(secs / 60);
	      	secs = secs % 60;

	      	this.ui.duration.text(mins + ':' + secs);
	      }
	});

});
