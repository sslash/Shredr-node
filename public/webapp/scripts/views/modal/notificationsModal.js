// TODO: this module is only meant to be extended
define([
  'backbone',
  'underscore',

  'views/modal/messageModal',
  'views/modal/conversationModal',
  'models/user',
  'models/conversation',

  // Templates
  'hbs!tmpl/modal/notificationsModal',
  ],function (Backbone, _, MessageModal, ConversationModal, User,
            Conversation, tpl) {

  return MessageModal.extend({
  	template : tpl,

  	_events : {
  		'click [data-event="bodyClk"]' : '__bodyClicked'
  	},

  	ui : {
  		notsList : '[data-region="notsList"]',
  		notsDetail : '[data-region="nots-detail"]',
      back : '[data-model="back"]'
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

  		if( type === 'New Message' ) {

        // this wont work. cant rely on the conversation being the newest.
        // Need an id here
  			var conversation = new Conversation(Shredr.user.get('conversations')[0]);
        var user = new User({id : conversation.get('initiatorId')});
        user.fetch({success: this.showMessageQueue.bind(this, conversation)});
  		}
  	},

    showMessageQueue : function (conversation, user) {
        this.ui.notsDetail.append(new ConversationModal({
          conversation : conversation,
          model : user
        }).render().el);
        this.ui.back.show();
    },

  	serializeData : function () {
  		return Shredr.user.toJSON();
  	}
  });
});