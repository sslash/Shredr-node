// TODO: this module is only meant to be extended
define([
'backbone',

'models/conversation',

// Templates
'hbs!tmpl/modal/conversationModal',
],function (Backbone, Conversation, tpl) {

    return Backbone.Marionette.ItemView.extend({
        template : tpl,

        events : {
            'submit form' : '__formSubmitted'
        },

        __formSubmitted : function (e) {
            e.preventDefault();
            e.stopPropagation();

            // TODO: continue here...
            var body = $('[data-model="comment-input"]').val();
            this.model.sendMessage(body);
        }
    });
});
