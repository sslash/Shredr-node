define([
	'backbone',
	'hbs!tmpl/shred/shredPreviewMeta_lg_tmpl',
	'hbs!tmpl/stage/comment_tmpl',

	// models
	'models/shred',

	// views
	'views/stage/tabsPreview',
],
function( Backbone, tmpl, CommentsTmpl, Shred, TabsView) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.ItemView.extend({

		template : tmpl,

		initialize : function (options) {
			this.parent = options.parent;
			this.player = options.player;
			this.listenTo(this.player, 'player:ready', this.playerReady);
			this.listenTo(this.model, 'change:rating', this.ratingChanged);
			this.listenTo(this.model, 'leChange:commentAdded', this.commentAddedSuccess);
		},

		ui : {
			duration : '[data-model="duration"]',
			logos : '.logos .logo-xsmall',
			tabs : '[data-region="tabs-region"]',
			meta : '[data-region="meta"]',
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

		events : {
			'mouseenter .logos .logo-xsmall' : '__logoEntered',
			'mouseleave .logos'		: '__logoExit',
			'click .logos .logo-xsmall' : '__rateClicked',
			'click [data-event="hide-btn"]' : '__hideClicked',
			'click [data-event="comment"]' : '__commentClicked',
			'keypress textarea' : '__commentKeyPress'
		},

		onRender : function () {
			this.renderDuration();
			this.renderComments();
		},

		onShow : function () {
			this.renderTabs();
		},

		renderTabs : function () {
			this.tabsView = new TabsView({model : this.model});
			this.ui.tabs.append(this.tabsView.render().el);
			this.tabsView.drawTabs();
		},

		playerReady : function () {
			this.renderDuration();
		},

		renderDuration : function () {
      		var secs = this.parent.getDuration();
      		var mins = Math.floor(secs / 60);
      		secs = secs % 60;

      		this.ui.duration.text(mins + ':' + secs);
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

		commentAddedSuccess : function(comment) {
			comment.user = Shredr.user.toJSON();
			this.renderComment(comment);
		},

		renderComment : function(comment) {
			var commentHtml = CommentsTmpl({
				body : comment.body,
				createdAt : comment.createdAt,
				user : comment.user
			});
			this.ui.commentsList.prepend(commentHtml);
		},

		renderComments : function() {
			// render comments
			if( this.model.get('comments')) {
				this.model.get('comments').forEach(function(comment) {
					this.renderComment(comment);
				}.bind(this));
			}
		},

      	// EVENTS

      	__commentKeyPress : function (e) {
      		if ( e.keyCode === 13 ) {
      			var comment = $(e.currentTarget).val();
				this.model.addComment(comment);
      		}
      	},

      	__commentClicked : function (e) {
      		$(e.currentTarget).parents('.row').find('.col-sm-8').html('<textarea placeholder="Insert Comment" class="light"></textarea>');
      	},

      	__hideClicked : function (e) {
      		if ( this.metaHidden ) {
      			this.metaHidden = false;
      			this.$('.show-btn').remove();
      			this.ui.meta.fadeIn();
      		} else {
      			this.metaHidden = true;
      			this.ui.meta.fadeOut();
      			var $btn = $(e.currentTarget).clone();
      			$btn.addClass('show-btn');
	      		$btn.find('small').text('Show');
	      		this.ui.tabs.prepend($btn);
      		}      		
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
	});

});
