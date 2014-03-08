// TODO: this module is only meant to be extended
define([
  'backbone',

  'models/conversation',

  // Templates
  'hbs!tmpl/modal/mainMessageLayout',
  ],function (Backbone, Conversation, tpl) {

  return Backbone.Marionette.Layout.extend({
      template : tpl,
      className : 'modal-flat modal-content',

      initialize : function (options) {
        if ( options.template) {
          this.template = tpl;
        }
      },

      ui : {
        textarea : 'textarea',
        content : '[data-region="modal-content"]'
      },

      events : {
        'click [data-event="cancel-btn"]' : '__cancelClicked',
        'submit form' : '__formSubmitted'
      },

      messageSentSuccess : function (res) {
        this.ui.content.children().fadeOut('fast', function() {
          this.ui.content.append('<p>Message was successfully sent</p><button class="btn" data-event="cancel-btn">Ok</button>');
        }.bind(this));
      },

      __cancelClicked : function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger('message:canceled');
      },

      __formSubmitted : function (e) {
        e.preventDefault();
        e.stopPropagation();

        this.conversation = new Conversation({
          originator : Shredr.user.get('_id'),
          recipient : this.model.get('id')
        });

        var body = this.ui.textarea.val();

        this.conversation.get('messages').push({
          body : body,
          from : 0,
          timestamp : new Date()
        });

        this.conversation.save({}, {
          success : this.messageSentSuccess.bind(this)
        });
      }
    });
});