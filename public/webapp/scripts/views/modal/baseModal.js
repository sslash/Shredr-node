define([
'backbone'
// Templates
// 'hbs!tmpl/modal/baseModal',
],function (Backbone) {
    'use strict'

    return Backbone.Marionette.Layout.extend({
        template : function () { return ''; },
        className : 'modal-flat modal-content drop-down drop-down-prev',

        initialize : function (options) {
            if ( options.classList ) {
                this.classList = options.classList;
            }

            this.listenTo(this, 'modal:show', this.showModal);
            this.listenTo(this, 'modal:hide', this.hideModal);
        },

        onRender : function () {
            if ( this.classList ) {
                this.classList.forEach(function(c) {
                    this.$el.addClass(c);
                }.bind(this));
            }
            this.trigger('modal:show');
        },

        showModal : function () {

            // scroll up, in case we're down
            window.scrollTo(0,0);

            // Drop the m-bomb
            setTimeout(function() {
                this.$el.removeClass('drop-down-prev');
                this.$el.addClass('drop-down-after');
            }.bind(this), 50);
        },

        onBeforeClose : function () {
            this.trigger('modal:hide');
        },

        hideModal : function () {
            this.$el.removeClass('drop-down-after');
            this.$el.addClass('drop-down-prev');
        }
    });
});
