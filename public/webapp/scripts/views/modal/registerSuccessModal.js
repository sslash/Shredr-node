define([
  'backbone',

  // Templates
  'hbs!tmpl/modal/registerSuccessModal',
  'hbs!tmpl/modal/musicalDNAModal',
  'hbs!tmpl/modal/musicalDNAsuccessModal',

  'autocomplete'
  ],function (Backbone, tpl, dnaTpl, dnaSuccessTpl) {

  var RegisterSuccessModal = {
    OnSuccessView : Backbone.Marionette.ItemView.extend({
      template : tpl,
      guitars : [],
      catecoriesSelected : [],

      ui : {
        successRegion : '[data-region="sucess-region"]',
        modalRegion : '.modal-flat'
      },

      events : {
        'click [data-event="ok-link"]' : '__okClicked',
        'click [data-event="ok-btn"]' : '__okClicked',
        'click [data-event="no-link"]' : '__noClicked',
        'click [data-event="done-btn"]' : '__doneDnaClicked',
        'click [data-event="dna-click"] li' : '__musicCategoryClicked',
        'click [data-event="gotostage-btn"]' : '__goToStage',
        'keypress #shred-tags' : '__keypressTags'
      },

      onDomRefresh : function() {
        var json = this.model.toJSON(); 
        this.dnahtml = dnaTpl(json);
        this.dnasuccessHtml = dnaSuccessTpl(json);
      },

      userRegistered : function(user) {
        this.ui.modalRegion.empty();
        this.ui.modalRegion.html(this.dnasuccessHtml);
        this.ui.modalRegion.css({'max-width': '300px'});
      },

      __okClicked : function(e) {
        e.preventDefault();
        this.ui.modalRegion.empty();
        this.ui.modalRegion.html(this.dnahtml);
        this.ui.modalRegion.css({width: '700px'});

        this.$('#guitar-tags').autocomplete({
          source : this.autocompleteTags,
          select: this.__tagSelected.bind(this)
        });
      },

      __noClicked : function(e) {
        e.preventDefault();
      },

      __goToStage : function() {
        Shredr.buzz.hideModal();
        Shredr.router.navigate("/theStage", {trigger: true});
      },

      __doneDnaClicked : function(e) {
        e.preventDefault();
        this.model.save({
          startedPlaying : this.$('#guitar-start').val(),
          location : this.$('#city').val(),
          birthdate : this.$('#birth').val(),
          guitars : this.guitars,
          musicDna : this.catecoriesSelected
        },{
          success : this.userRegistered.bind(this),
          error : function(error){}
        });
      },

      __musicCategoryClicked : function(e) {
        var $currTar = $(e.currentTarget);
        $currTar.find('img').css({'opacity' : 1});
        this.catecoriesSelected.push($currTar.find('span').text());
      },

      __tagSelected : function(event, ui) {
        var value = ui.item.label;
        this.guitars.push(value);
        var html = '<span class="font-xsmall">' + value + '</span>';
        this.$('[data-region="guitar-tags"]').append(html);
        this.$('#guitar-tags').val('');
        return false;
      },

      autocompleteTags : [
      'Gibson Les Paul',
      'Fender Stratocaster',
      'C-major Scale',
      'Marshall JCM-2000',
      'C-sharp major five'
      ]
    })
  };


  return RegisterSuccessModal;
});