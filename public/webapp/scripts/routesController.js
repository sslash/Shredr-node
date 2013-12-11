define([
	'backbone',

	// Views
	'views/item/nav',
	'views/landingPage/landingPage'

	], function (Backbone, NavMainView, LandingPageView) {

	var MainController = Backbone.Marionette.Controller.extend({

		/** Routing functions */
		landingPage : function() {
			this.renderNavigationView();
			this.renderLangingView();
			this.renderFooterView();
		},

		stagePage : function() {
		},

		/** Rendering functions */
		renderNavigationView : function(forced){
			if (forced || !this.navView) {
				this.navView = new NavMainView();
				Shredr.navigation.show(this.navView);
			}
		},

		renderLangingView : function(){
			var landingPage = new LandingPageView();
			Shredr.main.show(landingPage);
		},

		renderStageView : function() {
		},

		renderFooterView : function(){
		}

	});

return MainController;
});