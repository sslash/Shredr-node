define([
	'backbone',
	'backbone.marionette',
	'hbs!tmpl/stage/profiles_layout_tmpl',

	// collections
	'collections/usersCollection'
],
function( Backbone, Marionette, ProfileTmpl, UsersCollection) {
    'use strict';

	/* Return a Layout class definition */
	return Marionette.Layout.extend({

		initialize: function() {
			this.collection = new UsersCollection();
			this.collection.fetch({reset:true});
			this.listenTo(this.collection, 'reset', this.render);
			console.log("initialize a Profiles Layout");
		},
		
		template: ProfileTmpl,

		/* Layout sub regions */
		regions: {
		},

		/* ui selector cache */
		ui: {
			search : '[data-model="search"]'
		},

		serializeData : function () {
			return {
				users : this.collection.toJSON()
			}
		},

		/* Ui events hash */
		events: {
			'submit form' : '__formSubmitted'
		},

		__formSubmitted : function (e) {
			e.preventDefault();
			e.stopPropagation();
			var username = this.ui.search.val();
			this.collection.query({'username' : username});
		},

		/* on render callback */
		onRender: function() {
			console.log('render');
		}
	});

});
