define([
	'backbone',

	// Views
	'views/item/nav',
	'views/landingPage/landingPage',
	'views/nav/main',
	'views/stage/stage',
	'views/stage/profilesLayout',
	'views/profile/profileLayout',
	'views/shredroom/shredroom',
	'views/shred/shredPreviewView',

	// models
	'models/user',
	'models/shred'

	], function (Backbone, NavMainView, LandingPageView, MainNavView, 
		StageView, ProfilesView, ProfileView, ShredroomView, ShredPreviewView,
		User, Shred) {

	var MainController = Backbone.Marionette.Controller.extend({

		/** Routing functions */
		landingPage : function() {
			this.renderLandingNavView();
			this.renderLangingView();
			this.renderFooterView();
		},

		stagePage : function() {
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

		shredPreview : function (id) {
			this.renderNavigationView();
			this.renderShredPreview(id);
		},

		profile : function (id) {
			this.renderNavigationView();
			var model = new User({id : id});

			// Fade out the current view
			if ( Shredr.main.currentView ) {
				Shredr.main.currentView.$el.fadeOut(200, function() {
					this.renderProfileView (model);
				}.bind(this));

			// If a browser reload, just load the view 
			} else {
				this.renderProfileView (model);
			}
		},

		renderProfileView : function (model) {
			var view = new ProfileView ( {model : model} );
			Shredr.main.show(view);
		},

		renderShredPreview : function (id) {
			var shred = new Shred({id : id});
			var view = new ShredPreviewView ( {model : shred} );
			Shredr.main.show(view);	
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
			if ( !this.mainNavView ) {
				this.mainNavView = new MainNavView();
			}
			
			Shredr.navigation.show(this.mainNavView);
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