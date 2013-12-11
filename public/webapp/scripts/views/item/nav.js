define([
	'backbone',
	'hbs!tmpl/item/nav_tmpl'
],
function( Backbone, NavTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Nav ItemView");
		},
		
		template: NavTmpl,

		serializeData : function() {
            if (Shredr.loggedIn) {
                    return {
                            loggedIn: Shredr.loggedIn,
                            user : Shredr.user.toJSON()
                    };
            }
		},
        

		/* ui selector cache */
		ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
