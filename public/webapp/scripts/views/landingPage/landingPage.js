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

      onRender : function(){
        var $window = $(window);
        this.$('section[data-type="background"]').each(function(){
            var $bgobj = $(this); // assigning the object
         
            
            $window.scroll(function() {
                var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
                 
                // Put together our final background position
                var coords = '50% '+ yPos + 'px';
     
                // Move the background
                $bgobj.css({ backgroundPosition: coords });
            }); 
        });
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
