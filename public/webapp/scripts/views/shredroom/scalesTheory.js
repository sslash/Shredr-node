/* globals $ */
define([
    'backbone',

    'models/Shred',
    'views/stage/tabsPreview',
    'hbs!tmpl/shredroom/scalesTheory',
    'hbs!tmpl/shredroom/scalesTheoryScaleView',
    'hbs!tmpl/shredroom/scalesTheoryAddScale'
],
function( Backbone, Shred, TabsPreview, tmpl, scaleViewTpl, scaleAddTpl ) {
    'use strict';

    /* Return a Layout class definition */
    return Backbone.Marionette.ItemView.extend({

        template : tmpl,

        ui : {
          scaleRegion : '[data-region="scale"]'
        },

        events : {
          'click [data-event="add"]' : '__addBtnClicked'
        },

        onRender : function () {
            this.ui.scaleRegion.append(scaleViewTpl());
        },

        __addBtnClicked : function () {
          this.ui.scaleRegion.fadeOut('fast', function () {
            var model = new Shred();
            this.ui.scaleRegion.children().remove();
            this.ui.scaleRegion.append(scaleAddTpl());
            this.ui.scaleRegion.fadeIn('fast');
            this.$('[data-region="tabsArea"]').append(new TabsPreview({
              model : model
            }).render().el);
          }.bind(this));
        }
    });
});
