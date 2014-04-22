define([
    'backbone',
    'hbs!tmpl/global/kicker_base',
    'hbs!tmpl/battle/br_kicker'
],
function( Backbone, StagekickerTmpl, BrTmpl ) {
    'use strict';

    /* Return a ItemView class definition */
    var BaseView = Backbone.Marionette.ItemView.extend({
        template: StagekickerTmpl,
        className : 'container',

        serializeData : function () {
            return {
                headline : 'Stage Headline Here',
                kicker : 'Stage Kicker'
            }
        },

        ui : {
            headline : '[data-region="headline"]'
        }
    });

    var BattleRequestView = BaseView.extend({

        serializeData : function () {
            return {
                kicker: 'Create Battle Request'
            }
        },

        onRender : function () {
            this.ui.headline.html(BrTmpl({
                model : this.model.toJSON()
            }));
        }
    });

    return {
        BaseView : BaseView,
        BrView : BattleRequestView
    };
});
