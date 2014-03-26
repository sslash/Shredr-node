/* globals $ */
define([
'backbone',

'models/Scale',
'views/stage/tabsPreview',
'hbs!tmpl/shredroom/scalesTheoryScaleView'
],
function( Backbone, Scale, TabsPreviewView, tmpl ) {
    'use strict';

    /* Return a Layout class definition */
    return Backbone.Marionette.ItemView.extend({
        template : tmpl,

        ui : {
            tabs : '[data-region="tabs"]'
        },

        onRender : function () {
            window.model = this.model.toJSON();
            this.tabsView = new TabsPreviewView({model : this.model});
            this.ui.tabs.append(this.tabsView.render().el);
        },

        serializeData : function () {
            return {
                model : this.model.toJSON()
            };
        }
    });
});
