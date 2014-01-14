define([
	'backbone',
	'views/stage/thumbView'
],
function( Backbone, Thumbview  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.CollectionView.extend({
		className: 'col-sm-6 stage-clear',

		initialize: function() {
			console.log("initialize a Thumbscoll CollectionView");
			this.collection = new Backbone.Collection();
			this.collection.add({name: 'sap', description : 'lol'});
			this.collection.add({name: 'sap2', description : 'lol2'});
			this.collection.add({name: 'sap3', description : 'lol3'});
			this.collection.add({name: 'sap4', description : 'lol4'});
		},
		
    	itemView: Thumbview,
    	

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
