define([
	'backbone',

	// Views
	'views/modal/loginModalView',
	'views/modal/messageModal',

	], function (Backbone, LoginModalView, MessageModal) {

	var EventController = Backbone.Marionette.Controller.extend({

		openLoginModal : function() {
			var modal = new LoginModalView.MainView();
			Shredr.modal.show(modal);
		},

		openMessageModal : function() {
			Shredr.modal.show(new MessageModal.MainLayout({model : Shredr.user}));
		}
	});

	return EventController;
});