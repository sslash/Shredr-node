// takes a list of videofile objects and an audio file
// listens to play and stop events
// on play, it will play the audio file, and the video files
// in the order they were given.

// used by battleChallengeResponse.js
define([
    'components/component'
    ],
    function( Component, tmpl ) {
        'use strict';

        return Component.extend({

            initialize: function(options){
                options = options || {};
                this.videos = options.videos;
                this.audio = options.audio;

                // only support one video now


                this.listenTo(this, 'player:play', this.play);
                this.listenTo(this, 'player:stop', this.stop);
            },

            eachFrameLoop : function (fn) {
                var that = this;
                function loop () {
                    fn();
                    that.animateId = window.RAF(loop);
                }
                loop();
            },

            play : function () {
                var video = this.videos[0],
                    seconds = 0, frames = 0;

                window.RAF(function() {
                    this.audio.play();
                }.bind(this));

                this.eachFrameLoop(function() {
                    frames ++;
                    if ( (frames % 60) === 0 ) {
                        seconds ++;
                        frames = 0;
                        // update seconds in UI
                        //this.ui.duration.text(seconds + ', ' + frames);
                    }

                    if ( seconds === video.vidStartSec && frames === video.vidStartFramesOffset ) {
                        video.sel.play();
                    }

                }.bind(this));
            },

            stop : function () {
                if ( this.videos[0].sel) {
                    this.videos[0].sel.pause();
                    this.videos[0].sel.currentTime = 0;
                }

                if (this.audio) {
                    this.audio.pause();
                    this.audio.currentTime = 0;
                }
                window.cancelAnimationFrame(this.animateId);
                // this.ui.duration.text('0, 0');
            },
        });
    });
