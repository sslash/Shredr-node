define([
	'backbone',

	// Views
	'views/item/nav',
	'views/landingPage/landingPage',
	'views/nav/main',
	'views/stage/stage',
	'views/stage/profileLayout',
	'views/shredroom/shredroom'

	], function (Backbone, NavMainView, LandingPageView, MainNavView, 
		StageView,ProfilesView, ShredroomView) {

	var MainController = Backbone.Marionette.Controller.extend({

		/** Routing functions */
		landingPage : function() {
			console.log('Route: landing page');
			this.renderLandingNavView();
			this.renderLangingView();
			this.renderFooterView();
		},

		stagePage : function() {
			console.log("Route: The stage");
			this.renderNavigationView();

			this.renderStageView();

			this.renderFooterView();
		},

		shredroom : function() {
			this.renderLandingNavView();

			this.renderShredroomView();

			this.renderFooterView();
		},

		profiles : function() {
			this.renderNavigationView();
			this.renderProfilesView();
		},

		renderProfilesView : function() {
			var view = new ProfilesView();
			Shredr.main.show(view);
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

		renderShredroomView : function() {
			var view = new ShredroomView();
			Shredr.main.show(view);
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