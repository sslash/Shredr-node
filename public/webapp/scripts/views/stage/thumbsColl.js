define([
	'backbone',
	'views/stage/thumbView'
],
function( Backbone, Thumbview  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.CollectionView.extend({
		className: 'col-sm-6 clear-marg',

		renderCount : 0,

		initialize: function(options) {
			if ( options.itemClassname ) {
				this.itemViewOptions = {
					className : options.itemClassname
				};
			};
		},
		
    	itemView: Thumbview,

    	buildItemView: function(item, ItemViewType, itemViewOptions){
  			// build the final list of options for the item view type
  			var mustFadeOut = false;
  			if ( this.renderCount > 1 ) {
  				mustFadeOut = true;
  			}
  			this.renderCount++;

			var options = _.extend({model: item, mustFadeOut : mustFadeOut}, itemViewOptions);

			// create the item view instance
		  	var view = new ItemViewType(options);
		  	// return it
		  	return view;
		},
    	

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {
		}
	});

});
