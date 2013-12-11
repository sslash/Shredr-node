define([
	'backbone',
	'hbs!tmpl/landingpage/landingPageView',
	'hbs!tmpl/landingpage/landingPageLoggedIn'
],
function( Backbone, LandingpageTmpl, tplLoggedIn ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
		template: LandingpageTmpl,
		templateLoggedIn: tplLoggedIn,

      ui : {
        loginBtn: "#loginBtn"
      },

      events : {
        "click #loginBtn" : "__loginBtnClicked"
      },

      getTemplate: function(){
        if (Shredr.loggedIn){
          return this.templateLoggedIn;
        } else {
          return this.template;
        }
      },

      __loginBtnClicked : function() {
        Shredr.buzz.openLoginModal();
      }
	});
});
