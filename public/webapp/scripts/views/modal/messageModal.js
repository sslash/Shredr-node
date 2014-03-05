// TODO: this module is only meant to be extended
define([
  'backbone',
  'bootstrap',

  // Templates
  'hbs!tmpl/modal/mainMessageLayout',
  ],function (Backbone, bs, tpl) {

  return Backbone.Marionette.Layout.extend({
      template : tpl,
      className : 'modal-flat modal-content',

      initialize : function (options) {
        if ( options.template) {
          this.template = tpl;
        }
      },

      ui : {
        textarea : 'textarea'
      },

      events : {
        'click [data-event="cancel-btn"]' : '__cancelClicked',
        'submit form' : '__formSubmitted'
      },

      messageSentSuccess : function (res) {
        console.log('success!');
        this.trigger('message:canceled');
      },

      __cancelClicked : function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger('message:canceled');
      },

      __formSubmitted : function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.listenTo(this.model, 'message:sent:success', this.messageSentSuccess);
        var body = this.ui.textarea.val();
        this.model.sendMessage(body);
      }
    });
});