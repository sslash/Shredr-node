define([
  'backbone',
  'components/videoPlayerComponent',
  'models/battle',
  // Templates
  'hbs!tmpl/modal/battleChallengeResponse'
  ],function (Backbone, VPComponent, Battle, tpl) {
      'use strict';

    return Backbone.Marionette.ItemView.extend({
        template : tpl,

      initialize : function () {
          this.model.fetch();
          this.listenTo(this.model, 'sync', this.renderBattleRequest);
          this.listenTo(this.model, 'battleRequest:accept:success', this.acceptSuccess);
          this.listenTo(this.model, 'battleRequest:decline:success', this.declineSuccess);
      },

      events : {
          'click [data-event="play"]' :    '__playClicked',
          'click [data-event="stop"]' :    '__stopClicked',
          'click [data-event="accept"]' :  '__acceptClicked',
          'click [data-event="decline"]' : '__declineClicked',
          'click [data-event="done"]'    : '__doneClicked',
      },

      renderBattleRequest : function () {
          this.render();
          if ( this.model.get('mode') === 'Advanced' ) {
              this.renderVideoPlayer();
          }
      },

      renderVideoPlayer : function () {

          var video = this.$('video')[0];
          var audio = this.$('audio')[0];

          function tryRender () {
              if ( video.readyState < 3 || audio.readyState < 3) {
                  setTimeout(tryRender.bind(this), 40);
              } else {
                  this.vpComponent = new VPComponent({
                      videos : [{
                          sel : video,
                          vidStartSec: this.model.get('startSec'),
                          vidStartFramesOffset: this.model.get('startFrame')
                      }],
                      audio : audio
                  });
              }
          }
          tryRender.call(this);
      },

      // goto battle view
      acceptSuccess : function (battle) {
          this.battle = new Battle(battle);
          this.$el.children().remove();
          this.$el.append([
              '<p>Battle accepted. Its\'n on</p>',
              '<button data-event="done" class="btn">Go To Battle</button>'
              ].join('')
          );
      },

      declineSuccess : function (battle) {
          this.$el.children().remove();
          this.$el.append([
              '<p>Battle declined</p>',
              ].join('')
          );
      },

      // EVENTS
      __acceptClicked : function () {
          this.model.acceptRequest();
      },

      __doneClicked : function () {
          Shredr.router.navigate('battle/' + this.battle.get('_id'));
      },

        TODO: CREATE DECLINING
      __declineClicked : function () {
          this.model.declineRequest();
      },

      __playClicked : function () {
          this.vpComponent.trigger('player:play');
      },

      __stopClicked : function () {
          this.vpComponent.trigger('player:stop');
      }
    });
});
