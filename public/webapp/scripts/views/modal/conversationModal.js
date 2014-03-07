// TODO: this module is only meant to be extended
define([
  'backbone',

  // Templates
  'hbs!tmpl/modal/conversationModal',
  ],function (Backbone, tpl) {

    return Backbone.Marionette.ItemView.extend({
    	template : tpl,

      initialize : function (options) {
        this.conversation = options.conversation;
      },

      events : {
        'submit form' : '__formSubmitted'
      },

      __formSubmitted : function (e) {
        e.preventDefault();
        e.stopPropagation();

        // TODO: continue here...
      },

      serializeData : function () {
        return {
          conversation : this.conversation.toJSON(),
          otherUser : this.model.toJSON(),
          user : Shredr.user.toJSON()
        }
      }
    });
});