/* global Shredr */
define([
    'backbone',
    'hbs!tmpl/shredroom/tabs_tmpl',
    'views/shredroom/tabs'
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

            events : {
                'click [data-event="play-tabs"]' : '__playTabsClicked',
                'click [data-event="keyboard-clicked"]' : '__keyboardClicked',
                'click [data-event="save-tabs-btn"]' : '__saveTabslLicked'
            },

            onRender : function () {
                this.tabsView = new TabsEditor({
                    model : this.model,
                    template : 'create_shred_tabs_tmpl'
                });
                this.ui.tabs.append(this.tabsView.render().el);
                this.renderKeyboard();
            },

            renderKeyboard : function () {
                this.$("use").mousedown(this.startNote);
                this.$("use").mouseup(this.stopNote);
                this.$("#playAll").click(this.playAll);
            },

            __playTabsClicked : function () {
                this.tabsView.playTabs();
            },

            __keyboardClicked : function () {
                if(this.keyboardVis) {
                    this.$('.keyboard').animate({'left' : '-2000px'}, 'fast');
                    this.keyboardVis = false;
                } else {
                    this.$('.keyboard').animate({'left' : '56px'}, 'fast');
                    this.keyboardVis = true;
                }
            },

            __saveTabslLicked : function () {
                var tabs = this.tabsView.getTabs();
                this.model.set({tabs : tabs});
                Shredr.vent.trigger('nav:logo:rotate');
            }
        });

    });
