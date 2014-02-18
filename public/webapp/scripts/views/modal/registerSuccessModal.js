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
        modalRegion : '.modal-flat'
      },

      onDomRefresh : function() {
        this.dnahtml = dnaTpl(this.model.toJSON());
      },

      __okClicked : function(e) {
        e.preventDefault();
        this.ui.modalRegion.empty();
        this.ui.modalRegion.html(this.dnahtml);
        this.ui.modalRegion.animate({width: '500px'});
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