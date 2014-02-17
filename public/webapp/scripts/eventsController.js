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

		openMessageModal : function(messageType) {
			if(messageType === 'register:success') {
				// TODO: show register success modal and open musical DNA view
			} else {
				Shredr.modal.show(new MessageModal.MainLayout({model : Shredr.user}));
			}
		}
	});

	return EventController;
});