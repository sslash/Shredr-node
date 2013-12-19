define([
  'backbone',
  'bootstrap',

  // Templates
  'hbs!tmpl/modal/mainMessageLayout',
  ],function (Backbone, bs, tpl) {

  var MessageModal = {
    MainLayout : Backbone.Marionette.Layout.extend({
      template : tpl,

      ui : {
        modal : "#registerSuccessModal",
      },

      events : {
        "click button" : "__readyBtnClicked"
      },

      __readyBtnClicked : function() {
        this.ui.modal.modal('hide');
        //Shredr.router.navigate("/theStage", {trigger: true});
      },

      onDomRefresh : function() {
        this.ui.modal.modal('show');
      },
    })
  };

  return MessageModal;
});