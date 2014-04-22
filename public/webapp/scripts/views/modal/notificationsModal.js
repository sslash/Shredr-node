// TODO: this module is only meant to be extended
define([
'backbone',
'underscore',

'views/modal/messageModal',
'views/modal/conversationModal',
'views/modal/battleChallengeResponse',
'models/user',
'models/conversation',
'models/battleRequest',

// Templates
'hbs!tmpl/modal/notificationsModal',
],function (Backbone, _, MessageModal, ConversationModal, BrResponseView, User,
    Conversation, BattleRequest, tpl) {

    return MessageModal.extend({
        template : tpl,

        _events : {
            'click [data-event="bodyClk"]' : '__bodyClicked'
        },

        ui : {
            notsList : '[data-region="notsList"]',
            notsDetail : '[data-region="nots-detail"]',
            back : '[data-model="back"]'
        },

        initialize : function () {
            this.events = _.extend({}, MessageModal.prototype.events, this._events);
        },

        // TODO: show messages better, and probably find a better way of mapping
        // notifications to actual data
        __bodyClicked : function (e) {
            e.preventDefault();
            e.stopPropagation();

            this.ui.notsList.fadeOut('fast');
            var index = $(e.currentTarget).attr('data-index');
            var notification = Shredr.user.get('notifications')[parseInt(index, 10)];

            if( notification.type === 'New Message' ) {

                // this wont work. cant rely on the conversation being the newest.
                // Need an id here
                var conversation = new Conversation({id : notification.referenceId});

                // var conversation = new Conversation(Shredr.user.get('conversations')[0]);
                //    var user = new User({id : conversation.get('initiatorId')});
                conversation.fetch({success: function(conv) {
                    var view = new ConversationModal({
                        model : conv
                    });
                    this.showDetailView(view);
                }.bind(this)});

            // } else if ( notification.type === 'New Fan') {

            } else if (notification.type === 'New Battle Request') {
                var model = new BattleRequest({ id : notification.referenceId });
                var view = new BrResponseView({
                    model :model
                });
                this.showDetailView(view);
            }
            // Shredr.user.deleteNotification(notification.id);
        },

        showDetailView : function (view) {
            this.ui.notsDetail.append(view.render().el);
            this.ui.back.show();
        },

        showMessageQueue : function (conversation) {

        },

        serializeData : function () {
            return Shredr.user.toJSON();
        }
    });
});
