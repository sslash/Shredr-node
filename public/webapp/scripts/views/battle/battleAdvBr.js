define([
    'backbone',
    'views/global/kickerBase',
    'views/modal/okMessageModal',
    'components/uploadComponent',
    'hbs!tmpl/battle/battle_adv_br',
    'autocomplete'

    ],
    function( Backbone, KickerViews, MessageModalView, UploadComponent, tpl) {
    'use strict';

    /* Return a Layout class definition */
    return Backbone.Marionette.Layout.extend({
        template : tpl,
        className : 'container',

        initialize : function () {
            this.animateId = -1;
        },

        onRender : function () {
            Shredr.kicker.show(new KickerViews.BrView({model : this.model}));
            this.renderAsyncs();
        },

        events : {
            'click [data-event="play"]': '__playClicked',
            'click [data-event="stop"]': '__stopClicked',
            'click [data-event="save"]': '__saveClicked'
        },

        ui : {
            duration : '[data-model="duration"]'
        },

        renderAsyncs : function () {

            // These things need the DOM to be ready in order to render
            setTimeout( function () {
                try {
                    this.renderUpload();
                    this.renderAudioCanvas();
                } catch(e) {
                    console.log('sap' + e)
                    this.renderAsyncs.call(this);
                }
            }.bind(this), 50);
        },

        // UPLOADS

        renderUpload : function () {
            this.uploadComponent = new UploadComponent({
                fileUpload : true,
                fileDrop : true,
                el : '[data-region="upload"]'
            }).show();
            this.listenTo(this.uploadComponent, 'file:changed:thumb:created', this.videoUploaded);
        },

        // DRAGGING

        videoUploaded : function (src) {
            // remove the upload region
            this.$('[data-model="instr"]').text('Drag the video on the timeline so it starts on the correct timeframe');
            this.$('[data-region="upload"]').remove();

            // show the video-draggable region
            this.$dragRegion = this.$('[data-region="video-drag"]');
            // this.$dragRegion.addClass('drag-vid-region');
            this.$('[data-region="arrow"]').show();

            // save a reference to the region's rect
            this.videoDragRect = $.find('[data-region="video-drag"]')[0].getBoundingClientRect();

            // add the uploaded video to that region
            this.$dragRegion.append([
                '<video class="vid-drag" data-model="drag">',
                '<source src="' + src + '"</source></video>',
            ].join(''));

            // save a reference to the video
            this.$video = this.$('[data-model="drag"]');
            this.$video.draggable({
                containment: 'parent',
                stop: this.dragStop.bind(this)
            });
        },

        // set number of seconds until video must start
        dragStop : function (e) {
            // get percentage of pixels from left
            var left = $(e.target)[0].getBoundingClientRect().left;
            left = left - this.videoDragRect.left;

            // percent from left
            var vidStartPercent = (left/this.videoDragRect.width) * 100;

            // set this percent in seconds (i.e play-offset into audio)
            this.setVidStartSec(vidStartPercent);

            // update the second offset in the UI
            if ( !this.$offset) {
                this.$offset = this.$('[data-model="offset"]');
            }
            this.$offset.animate({'left' : left + 'px'});
            this.$offset.text(this.vidStartFrac + '(' + this.vidStartSec + 's ' + this.vidStartFramesOffset + 'f)');
        },

        setVidStartSec : function (vidStartPercent) {
            var audioLength = this.$audio[0].duration;
            var vidStartSec = (audioLength / 100) * vidStartPercent
            this.vidStartFramesOffset = 0;

            // set offset in frames
            var frac = (vidStartSec+'').match(/\d+\.(\d\d)/);
            if (frac && frac.length > 0 ) {
                frac = parseInt(frac[1],10);
                // save frames (max 59)
                this.vidStartFramesOffset = Math.floor((frac / 100) * 60);
            }
            // only for debug
            this.vidStartFrac = vidStartSec;

            // save seconds
            this.vidStartSec = Math.floor(vidStartSec);
        },

        // SIMPLE CANVAS

        renderAudioCanvas : function () {
            // setTimeout(function() {
            this.$audio = $('audio');
            var $audioRegion = $.find('[data-region="audio"]');
            var rect = $audioRegion[0].getBoundingClientRect();
            var x = rect.height/2;
            var c = document.getElementById("myCanvas");
            c.width = rect.width;
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(0, x);
            ctx.lineTo(0+rect.width, x);
            ctx.stroke();
            // }.bind(this), 1000)
        },

        // PLAYBACKS

        eachFrameLoop : function (fn) {
            var that = this;
            function loop () {
                fn();
                that.animateId = window.RAF(loop);
            };
            loop();
        },

        // EVENTS
        __playClicked : function () {
            window.RAF(function() {
                this.$audio[0].play();
            }.bind(this));

            var seconds = 0, frames = 0;
            this.eachFrameLoop(function() {
                frames ++;
                if ( (frames % 60) === 0 ) {
                    seconds ++;
                    frames = 0;
                    // update seconds in UI
                    this.ui.duration.text(seconds + ', ' + frames);
                }

                if ( seconds === this.vidStartSec && frames === this.vidStartFramesOffset ) {
                    this.$video[0].play();
                }

            }.bind(this))
        },

        __stopClicked : function () {
            if ( this.$audio) {
                this.$audio[0].pause();
                this.$audio[0].currentTime = 0;
            }

            if (this.$video) {
                this.$video[0].pause();
                this.$video[0].currentTime = 0;
            }
            window.cancelAnimationFrame(this.animateId);
            this.ui.duration.text('0, 0');
        },

        __saveClicked : function () {
            this.model.save({
                startSec : this.vidStartSec,
                startFrame : this.vidStartFramesOffset
            },{success : this.saveSuccess.bind(this)});
        },

        saveSuccess : function () {
            this.listenTo(this.uploadComponent, 'file:upload:success', this.showFinishedMsg);
            this.uploadComponent.upload(this.model.getUploadAdvancedFinishedUrl());
        },

        showFinishedMsg : function () {
            var modal = new MessageModalView({
                message : 'Battle request was sent.' +
                            'You will be notified when ' +
                             this.nickname + ' answers'
            });
            Shredr.vent.trigger('modal:show', modal);
            this.listenTo(Shredr.vent, 'modal:close', function () {
                Shredr.router.navigate("/theStage", {trigger: true});
            });
        }
    });

});
