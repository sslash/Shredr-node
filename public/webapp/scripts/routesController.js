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
	'views/shredroom/resources', // SrTheoryView

	// models
	'models/user',
	'models/shred'

	], function (Backbone, NavMainView, LandingPageView, MainNavView,
		StageView, ProfilesView, ProfileView, ShredroomView, ShredPreviewView,
		SrTheoryView, User, Shred) {

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
			this.renderShredroomNavView();
			this.renderShredroomView();
			this.renderFooterView();
		},

		theorySection : function () {
			this.renderShredroomNavView('Theory Section');
			this.renderTheorySection();
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
		// render things

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

		renderShredroomNavView : function (subCat) {
			if ( !this.mainNavView ) {
				this.mainNavView = new MainNavView({subTmpl : 'shredroom', subCat : subCat});
			} else {
				this.mainNavView.setSubTmpl('shredroom', subCat);
			}
			Shredr.navigation.show(this.mainNavView);
		},

		renderNavigationView : function() {
			if ( !this.mainNavView ) {
				this.mainNavView = new MainNavView();
			} else {
				this.mainNavView.setSubTmpl('std');
			}

			Shredr.navigation.show(this.mainNavView);
		},

		renderShredroomView : function() {
			var view = new ShredroomView();
			Shredr.main.show(view);
		},

		renderTheorySection : function () {
			var view = new SrTheoryView();
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

		renderFooterView : function() {
		}

	});

return MainController;
});
