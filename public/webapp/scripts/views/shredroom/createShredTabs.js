define([
    'backbone',
    'hbs!tmpl/shredroom/tabs_tmpl',
    'views/shredroom/tabs',
],
function( Backbone, TabsTmpl, TabsEditor ) {
    'use strict';

    /* Return a ItemView class definition */
    return Backbone.Marionette.ItemView.extend({
        className : 'sr-background over-fs-2',

        template: TabsTmpl,

        /* ui selector cache */
        ui: {
            tabs : '[data-region="leTabs"]'
        },

        events : {},

        onRender : function () {
            this.tabsView = new TabsEditor({
                model : this.model,
                template : 'create_shred_tabs_tmpl'});
            this.ui.tabs.append(this.tabsView.render().el);
        }
    });

});
