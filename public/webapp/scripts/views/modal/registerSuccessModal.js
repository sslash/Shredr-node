define([
  'backbone',

  // Templates
  'hbs!tmpl/modal/registerSuccessModal',
  'hbs!tmpl/modal/musicalDNAModal',
  ],function (Backbone, tpl, dnaTpl) {

  var RegisterSuccessModal = {
    OnSuccessView : Backbone.Marionette.ItemView.extend({
      template : tpl,

      initialize : function() {
        this.model = new Backbone.Model({
          username : 'Mad Mike'
        });
        console.log('init view : ' + JSON.stringify(this.model.toJSON()));
      },

      ui : {
        successRegion : '[data-region="sucess-region"]',
        dnaRegion : '[data-region="dna-region"]'
      },

      onDomRefresh : function() {
        this.ui.dnaRegion.html(dnaTpl(this.model.toJSON()));
      },

      __okClicked : function(e) {
        e.preventDefault();
        this.ui.successRegion.remove();
        this.ui.dnaRegion.show();
      },

      __noClicked : function(e) {
        e.preventDefault();
      },

      events : {
        'click [data-event="ok-link"]' : '__okClicked',
        'click [data-event="ok-btn"]' : '__okClicked',
        'click [data-event="no-link"]' : '__noClicked'
      }
    })
  };

  return RegisterSuccessModal;
});