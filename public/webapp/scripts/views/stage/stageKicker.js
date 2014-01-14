define([
	'backbone',
	'hbs!tmpl/stage/stageKicker_tmpl'
],
function( Backbone, StagekickerTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		className : 'row',

		initialize: function() {
			console.log("initialize a Stagekicker ItemView");
		},
		
		template: StagekickerTmpl,
        

		/* ui selector cache */
		ui: {},

		/* Ui events hash */
		events: {
			'keyup .inline-search' : '__searchKeyPressed'
		},

		/* on render callback */
		onRender: function() {
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
