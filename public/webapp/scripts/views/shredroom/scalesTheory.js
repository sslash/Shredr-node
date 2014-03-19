/* globals $ */
define([
    'backbone',

    'hbs!tmpl/shredroom/scalesTheory'
],
function( Backbone, tmpl ) {
    'use strict';

    /* Return a Layout class definition */
    return Backbone.Marionette.ItemView.extend({

        template : tmpl
    });
});
