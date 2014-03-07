// TODO: this module is only meant to be extended
define([
  'backbone',
  'underscore',

  'views/modal/messageModal',

  // Templates
  'hbs!tmpl/modal/notificationsModal',
  ],function (Backbone, _, MessageModal, tpl) {

  return MessageModal.extend({
  	template : tpl,

  	_events : {
  		'click [data-event="bodyClk"]' : '__bodyClicked'
  	},

  	ui : {
  		notsList : '[data-region="notsList"]',
  		notsDetail : '[data-region="nots-detail"]'
  	},

  	initialize : function () {
  		this.events = _.extend({}, MessageModal.prototype.events, this._events);
  	},


  	// TODO: show messages better, and probably find a better way of mapping
  	// notifications to actual data
  	__bodyClicked : function (e) {
  		e.preventDefault();
  		e.stopPropagation();

		this.ui.notsList.fadeOut('fast');
  		var type = $(e.currentTarget).attr('data-model');

  		if( type==='New Message' ) {
  			var conversation = Shredr.user.get('conversations')[0];
  			var msg = conversation.messages[conversation.messages.length-1];
  			this.ui.notsDetail.append('<p>' + msg.body + '</p>');
  		}
  	},



  	serializeData : function () {
  		return Shredr.user.toJSON();
  	}
  });
});