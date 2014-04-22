define([
	'backbone',

	// Views
	'views/modal/loginModalView',
	'views/modal/messageModal',
	'views/modal/registerSuccessModal',
	'views/battle/battleAdvBr',


	], function (Backbone, LoginModalView, MessageModal,
		RegisterSuccessModal, BattleAdvBrView) {

	var EventController = Backbone.Marionette.Controller.extend({

		initialize : function () {
			this.listenTo(Shredr.vent, 'modal:show', this.showModal);
			this.listenTo(Shredr.vent, 'modal:close', this.hideModal);
			this.listenTo(Shredr.vent, 'br:advanced:show', this.showBrAdvanced);
		},

		// render global region views
		start : function () {
			// Regions
			this.listenTo(Shredr.kicker, 'show', this.showKicker);
		},

		openLoginModal : function() {
			var modal = new LoginModalView.MainView();
			$('.fullscreen #loginArea').hide();
			Shredr.modal.show(modal);
		},

		openMessageModal : function(messageType) {
			$( '.fullscreen #loginArea' ).hide();
			if( messageType === 'register:success' ) {
				// TODO: show register success modal and open musical DNA view
				Shredr.modal.show(new RegisterSuccessModal.OnSuccessView({model : Shredr.user}));
			} else {
				Shredr.modal.show(new MessageModal.MainLayout({model : Shredr.user}));
			}
		},

		hideModal : function () {
			var model = Shredr.modal.currentView.model;
			Shredr.modal.close();
			Shredr.vent.trigger('modal:close:after', model);
		},

		showModal : function (view) {
			Shredr.modal.show(view);
		},

		showBrAdvanced : function (model) {
			Shredr.router.navigate('battle/battleRequest/' + model.get('_id'));
			var view = new BattleAdvBrView({model : model});
			Shredr.main.show(view);
		},

		showKicker : function () {
			// Temporary hack until all views uses the Shredr.kicker for kicker
			$(Shredr.main.el).css('padding-top', '0');
			$(Shredr.kicker.el).show();
		}
	});

	return EventController;
});
