/* globals $ */
define([
'backbone',

'views/shredroom/scalesTheory',
'hbs!tmpl/shredroom/comingSoon'
],
function( Backbone, ScalesTheoryView, tmpl ) {
    'use strict';

    /* Return a Layout class definition */
    return ScalesTheoryView.extend({
        template : tmpl,

        ui : {},

        onRender : function () {},

        serializeData : function () {}
    });
});
