define([
	'backbone',

	// Views
	'views/modal/loginModalView',
	'views/modal/messageModal',
	'views/modal/registerSuccessModal',


	], function (Backbone, LoginModalView, MessageModal, RegisterSuccessModal) {

	var EventController = Backbone.Marionette.Controller.extend({

		openLoginModal : function() {
			console.log('modal open');
			// var modal = new LoginModalView.MainView();
			$('.fullscreen #loginArea').hide();
			Shredr.modal.show(new RegisterSuccessModal.OnSuccessView({model : Shredr.user}));
			// Shredr.modal.show(modal);
		},

		openMessageModal : function(messageType) {
			$('.fullscreen #loginArea').hide();
			if(messageType === 'register:success') {
				// TODO: show register success modal and open musical DNA view
				Shredr.modal.show(new RegisterSuccessModal.OnSuccessView({model : Shredr.user}));
			} else {
				Shredr.modal.show(new MessageModal.MainLayout({model : Shredr.user}));
			}
		}
	});

	return EventController;
});