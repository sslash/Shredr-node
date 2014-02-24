define([
	'backbone',
	'hbs!tmpl/stage/stageKicker_tmpl'
],
function( Backbone, StagekickerTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Stagekicker ItemView");
			Shredr.vent.on('stage:thumbclicked:fadeout', this.changeHeadline.bind(this));
		},
		
		template: StagekickerTmpl,
        

		/* ui selector cache */
		ui: {
			headline : '[data-model="headline"]',
			backbtn : '[data-event="back-btn"]',
			header : '[data-model="header"]',
			clickarea : '[data-event="clickarea"]'
		},

		/* Ui events hash */
		events: {
			'keyup .inline-search' : '__searchKeyPressed',
			'click [data-event="back-btn"]' : '__backClicked'
		},

		serializeData : function () {
			return {
				headline : 'Stage Headline Here',
				kicker : 'Stage Kicker'
			}
		},

		changeHeadline : function(model) {
			var shouldChangeKicker = Shredr.request('stage:thumbclicked:shouldfade');
			if ( shouldChangeKicker ) {
				this.ui.header.text('Preview');
				this.ui.headline.text(model.get('type'));
				this.ui.backbtn.show();
			}
		},

		__backClicked : function(e) {
			this.ui.header.text('Stage Kicker');
			this.ui.headline.text('Stage Headline Here');
			this.ui.backbtn.hide();

			Shredr.vent.trigger('stage:kickerback:clicked');
		},

		__searchKeyPressed : function(e) {
			if( e.keyCode !== 13 && e.keyCode !== 8) { 
				return true;
			}

			var $currTarget = $(e.currentTarget);
			var $searchContent = $currTarget.siblings('.search-content');

			if ( e.keyCode === 8 ) {
				$searchContent.children().last().remove();
			} else {			
				var searchTxt = $currTarget.val();
				$currTarget.val('');
				var tagHtml = '<span class="search-tag">'+searchTxt+'</span>';
				$searchContent.append(tagHtml);
			}

			var searchWidth = $searchContent.width() + 12;
			$(e.currentTarget).css('padding-left',searchWidth);
		}
	});

});
