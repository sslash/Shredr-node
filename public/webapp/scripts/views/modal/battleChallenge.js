define([
    'backbone',
    'views/modal/baseModal',
    'models/battleRequest',
    'components/uploadComponent',
    'collections/jamtrackCollection',

    // Templates
    'hbs!tmpl/modal/battle_challenge_1',
    'hbs!tmpl/modal/battle_challenge_2',
    ],function (Backbone, BaseModal, BattleRequest, UploadComponent,
        JamtrackCollection, tpl, tpl2) {
    'use strict'

    return BaseModal.extend({
        template : tpl,

        initialize : function (options) {
            BaseModal.prototype.initialize.call(this, {
                classList : ['wide']
            });

            // first view is "choose mode" aka state 1
            this.state = 1;
            this.battlee = options.battlee;
            this.model = new BattleRequest({
                battler : Shredr.user.toJSON(),
                battlee : this.battlee.toJSON()
            });
        },

        ui : {
            mainRegion : '[data-region="main"]'
        },

        events : {
            'click [data-event="model-sel"]' : '__modeSelClicked',
            'click [data-event="next"]'      : '__nextClicked',
            'change [data-model="jamtracks"]' : '__jamtracksChanged'
        },

        serializeData : function () {
            this.nickname = this.battlee.get('username').split(' ')[0];
            return {
                nickname : this.nickname
            }
        },

        renderStateTwo : function () {
            if ( this.model.get('mode') === 'Advanced' ) {
                this.jamtrackColl = new JamtrackCollection();
                this.listenTo(this.jamtrackColl, 'reset', this.renderJamtracks);
                this.jamtrackColl.fetch({reset:true});
            }
            this.ui.mainRegion.append(tpl2({
                mode : this.model.get('mode')
            }));
            this.ui.mainRegion.fadeIn('fast');

            // render upload component
            this.uploadComponent = new UploadComponent({
                fileUpload : true,
                fileDrop : true,
                el : '[data-region="upload"]'
            }).show();
        },

        renderStateThree : function () {

            if ( this.model.get('mode') === 'Advanced' ) {
                this.ui.mainRegion.append([
                '<div class="section">',
                '<h3>Done.<h3>',
                '<small>Now let\'s go and add the initial battle video!</small>',
                '</div>'].join(''));
            } else {
                this.ui.mainRegion.append([
                '<div class="section">',
                '<h3>Battle request was sent.<h3>',
                '<small>You will be notified when ' + this.nickname + ' answers</small>',
                '</div>'].join(''));
            }
            this.ui.mainRegion.fadeIn('fast');
        },

        goToNextState : function () {
            this.state++;

            // Change the current view
            this.ui.mainRegion.fadeOut('fast',function() {

                this.ui.mainRegion.children().remove();

                if ( this.state === 2 ) {
                    this.renderStateTwo();
                    this.$('[data-event="next"]').text('Done');

                } else {
                    this.renderStateThree();
                    this.$('[data-event="next"]').text('Ok');
                }

            }.bind(this));
        },

        renderJamtracks : function () {
            var $el = this.$('[data-model="jamtracks"]');
            this.jamtrackColl.forEach(function(jt) {
                var html = '<option value="' + jt.get('_id') + '">' + jt.get('title') + '</option>';
                $el.append(html);
            });
        },

        // at this moment, we have two options:
        // mode 1 : assume user has uploaded the initial video
        // mode 2 : assume user has a jamtrack
        uploadVideoOrJT : function () {
            this.listenTo(this.uploadComponent, 'file:upload:success', this.goToNextState.bind(this));
            this.uploadComponent.upload(this.model.getUploadUrl());
        },

        saveBattleRequest : function () {

            // if user has selected a jamtrack from the list.
            // no need to upload anything
            if ( this.model.get('jamtrackId') ) {
                this.model.save({
                    rounds : this.$('#rounds').val(),
                    statement : this.$('#statement').val()
                }, {success : this.goToNextState.bind(this)} );

            // Or, user should have uploaded either a jamtrack (mode 1), or video
            } else {
                // TODO: create error message to user
                if ( !this.uploadComponent.fileAdded() ) { return false;}

                this.model.save({
                    rounds : this.$('#rounds').val(),
                    statement : this.$('#statement').val()
                }, {success : this.uploadVideoOrJT.bind(this)} );
            }
        },

        // EVENTS

        __jamtracksChanged : function (e) {
            var id = $(e.currentTarget).val();
            this.model.set('jamtrackId', id);
        },

        __modeSelClicked : function (e) {
            var $curr = $(e.currentTarget);
            this.model.set('mode', $curr.attr('data-model'));
            this.$el.find('.selected').removeClass('selected');
            $curr.find('img').addClass('selected');
            $curr.find('h3').addClass('selected');
        },

        __nextClicked : function () {

            // we're done now.
            if ( this.state === 3 ) {
                Shredr.vent.trigger('modal:close');
            // time to save
            } else if ( this.state === 2 ) {
                this.saveBattleRequest();

            // or try go to state 2
            } else {

                // TODO: create message to user
                if (!this.model.get('mode')) { return false; }
                this.goToNextState();
            }
        }
    });
});
