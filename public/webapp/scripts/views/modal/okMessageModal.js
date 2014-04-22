// TODO: this module is only meant to be extended
define([
  'backbone',

  'views/modal/messageModal',
  // Templates
  'hbs!tmpl/modal/okMessageModal',
  ],function (Backbone, MessageModal, tpl) {

  return MessageModal.extend({
  	template : tpl,

    initialize : function (options) {
      if (options.message) {
        this.message = options.message;
      }
    },

    events : {
      'click button' : '__okClicked'
    },

    __okClicked : function () {
      this.trigger('message:ok');
      Shredr.vent.trigger('modal:close');
    },

    serializeData : function () {
      return {
        message : this.message || ''
      }
    }
  });
});
