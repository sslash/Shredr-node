define([
	'backbone',
	'hbs!tmpl/stage/preview_tmpl',
	'hbs!tmpl/stage/comment_tmpl',

	'views/stage/tabsPreview'
],
function( Backbone, PreviewTmpl, CommentsTmpl, TabsPreviewView) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({
		className : 'stage-box preview-inner',

		initialize: function(options) {
			if ( options.fetch === true ) {
				this.model.fetch();	
			}

			if ( options.includeUserInfo === true ) {
				this.model.set({includeUserInfo : true});
			} else {
				this.model.set({includeUserInfo : false});
			}
			
			this.listenTo(this.model, 'change:tags', this.populateView);
			this.listenTo(this.model, 'change:rating', this.ratingChanged);
			this.listenTo(this.model, 'change:comments', this.commentsChanged);
			this.listenTo(this.model, 'leChange:commentAdded', this.commentAddedSuccess);
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
			comment : '[data-model="comment-input"]',
			logos : '.logos .logo-xsmall',
			commentsList : '[data-region="comments-list"]',

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

			rating : '[data-model="rating"]',
			rateVal : '[data-model="rateVal"]'
		},

		/* Ui events hash */
		events: {
			'mouseenter .logos .logo-xsmall' : '__logoEntered',
			'mouseleave .logos'		: '__logoExit',
			'click .logos .logo-xsmall' : '__rateClicked',
			'click [data-model="comment-input"]' : '__commentClicked',
			'click [data-event="comment-submit"]' : '__addCommentClicked'
		},

		/* on render callback */
		onShow: function() {
			this.onYouTubeIframeAPIReady();
			this.renderTabs();
		},

		commentsChanged : function() {
			// render comments
			if( this.model.get('comments')) {
				this.model.get('comments').forEach(function(comment) {
					this.renderComment(comment);
				}.bind(this));
			}
		},

		renderTabs : function (){
			this.tabs.show(new TabsPreviewView({model : this.model}));
		},

		populateView : function() {
			this.model.get('tags').forEach(function(t){
				this.ui.tags.append('<span class="font-xsmall"><strong>' + t + '<strong></span>');
			}, this);
		},

		ratingChanged : function(modal) {
			this.colorLogos(this.currRateVal-1, 'img/icons/logo_sml_grey.png');
			this.ui.rateVal.text(this.model.get('rateValue'));
		},

		colorLogos : function(index, img) {

			for (var i = 0; i <= index; i ++ ) {
				var $logo = this.ui['index'+i];
				$logo.attr('src', img );
			}

			for ( var i = index +1; i < 10; i++ ) {
				var $logo = this.ui['index'+i];
				$logo.attr('src', 'img/icons/logo_sml_white.png');	
			}
		},

		// Maybe this could be a sparate view...
		renderComment : function(comment) {
			var commentHtml = CommentsTmpl({
				body : comment.body,
				createdAt : comment.createdAt,
				user : comment.user
			});
			this.ui.commentsList.prepend(commentHtml);
		},

		commentAddedSuccess : function(comment) {
			comment.user = Shredr.user.toJSON();
			this.renderComment(comment);
		},

		__addCommentClicked : function(e) {
			e.preventDefault();
			var comment = this.ui.comment.val();
			this.model.addComment(comment);
		},

		__commentClicked : function(e) {
			this.ui.comment.animate({ 'height' : '100px' });
		},

		__logoExit : function(e) {
			if ( !this.model.get('userHasRated') ) {
				this.ui.logos.attr('src', 'img/icons/logo_sml_white.png');
			} else {
				this.colorLogos(this.rateVal-1, 'img/icons/logo_sml_grey.png');
			}
		},

		__rateClicked : function() {
			this.rateVal = this.currRateVal;
			this.model.rate(this.currRateVal);
		},

		__logoEntered : function(e) {
			var $curr = $(e.currentTarget);
			var index = parseInt($curr.attr('data-index'), 10);
			this.currRateVal = index + 1;
			this.ui.rating.text(this.currRateVal + '/10');
			this.colorLogos(index, 'img/icons/logo_sml-black.png');
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
