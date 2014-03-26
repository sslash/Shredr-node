define([
    'backbone'
],
function( Backbone ) {
    'use strict';

    /* Return a model class definition */
    return Backbone.Model.extend({
        urlRoot : 'api/scales/',
        initialize: function() {
            if ( this.get('_id') ) {
                this.id = this.get('_id');
            }
        },

        defaults: {
            title : '',
            description : '',
            tabs : {},
            tabsKey : ''
        }
    });
});
