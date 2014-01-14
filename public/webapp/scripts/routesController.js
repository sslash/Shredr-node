define([
	'backbone',

	// Views
	'views/item/nav',
	'views/landingPage/landingPage',
	'views/nav/main',
	'views/stage/stage'

	], function (Backbone, NavMainView, LandingPageView, MainNavView, StageView) {

	var MainController = Backbone.Marionette.Controller.extend({

		/** Routing functions */
		landingPage : function() {
			this.renderLandingNavView();
			this.renderLangingView();
			this.renderFooterView();
		},

		stagePage : function() {
			console.log("The stage");
			this.renderNavigationView();

			this.renderStageView();

			this.renderFooterView();
		},

		/** Rendering functions */
		renderLandingNavView : function(forced){
			if (forced || !this.navView) {
				this.navView = new NavMainView();
				Shredr.navigation.show(this.navView);
			}
		},

		renderNavigationView : function() {
			var view = new MainNavView();
			Shredr.navigation.show(view);
		},

		renderStageView : function() {
			// var view = new 
			// Shredr.main.sho
		},

		renderLangingView : function(){
			var landingPage = new LandingPageView();
			Shredr.main.show(landingPage);
		},

		renderStageView : function() {
			var view = new StageView();
			Shredr.main.show(view);
		},

		renderFooterView : function(){
		}

	});

return MainController;
});