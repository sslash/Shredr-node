define([
    'backbone',
    'hbs!tmpl/shredroom/tabs_tmpl',
    'views/shredroom/tabs',
    ],
    function( Backbone, TabsTmpl, TabsEditor ) {
        'use strict';

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({
            className : 'sr-background over-fs-2',

            template: TabsTmpl,

            /* ui selector cache */
            ui: {
                tabs : '[data-region="leTabs"]'
            },

            events : {
                'click [data-event="play-tabs"]' : '__playTabsClicked',
                'click [data-event="keyboard-clicked"]' : '__keyboardClicked',
                'click [data-event="save-tabs-btn"]' : '__saveTabslLicked'
            },

            initialize : function () {
              this.notes =  {
                  'C0': 16.35,
                  'C#0': 17.32,
                  'Db0': 17.32,
                  'D0': 18.35,
                  'D#0': 19.45,
                  'Eb0': 19.45,
                  'E0': 20.60,
                  'F0': 21.83,
                  'F#0': 23.12,
                  'Gb0': 23.12,
                  'G0': 24.50,
                  'G#0': 25.96,
                  'Ab0': 25.96,
                  'A0': 27.50,
                  'A#0': 29.14,
                  'Bb0': 29.14,
                  'B0': 30.87,
                  'C1': 32.70,
                  'C#1': 34.65,
                  'Db1': 34.65,
                  'D1': 36.71,
                  'D#1': 38.89,
                  'Eb1': 38.89,
                  'E1': 41.20,
                  'F1': 43.65,
                  'F#1': 46.25,
                  'Gb1': 46.25,
                  'G1': 49.00,
                  'G#1': 51.91,
                  'Ab1': 51.91,
                  'A1': 55.00,
                  'A#1': 58.27,
                  'Bb1': 58.27,
                  'B1': 61.74,
                  'C2': 65.41,
                  'C#2': 69.30,
                  'Db2': 69.30,
                  'D2': 73.42,
                  'D#2': 77.78,
                  'Eb2': 77.78,
                  'E2': 82.41, // start tabs here
                  'F2': 87.31,
                  'F#2': 92.50,
                  'Gb2': 92.50,
                  'G2': 98.00,
                  'G#2': 103.83,
                  'Ab2': 103.83,
                  'A2': 110.00,
                  'A#2': 116.54,
                  'Bb2': 116.54,
                  'B2': 123.47,
                  'C3': 130.81,
                  'C#3': 138.59,
                  'Db3': 138.59,
                  'D3': 146.83,
                  'D#3': 155.56,
                  'Eb3': 155.56,
                  'E3': 164.81,
                  'F3': 174.61,
                  'F#3': 185.00,
                  'Gb3': 185.00,
                  'G3': 196.00,
                  'G#3': 207.65,
                  'Ab3': 207.65,
                  'A3': 220.00,
                  'A#3': 233.08,
                  'Bb3': 233.08,
                  'B3': 246.94,
                  'C4': 261.63,
                  'C#4': 277.18,
                  'Db4': 277.18,
                  'D4': 293.66,
                  'D#4': 311.13,
                  'Eb4': 311.13,
                  'E4': 329.63,
                  'F4': 349.23,
                  'F#4': 369.99,
                  'Gb4': 369.99,
                  'G4': 392.00,
                  'G#4': 415.30,
                  'Ab4': 415.30,
                  'A4': 440.00,
                  'A#4': 466.16,
                  'Bb4': 466.16,
                  'B4': 493.88,
                  'C5': 523.25,
                  'C#5': 554.37,
                  'Db5': 554.37,
                  'D5': 587.33,
                  'D#5': 622.25,
                  'Eb5': 622.25,
                  'E5': 659.26,
                  'F5': 698.46,
                  'F#5': 739.99,
                  'Gb5': 739.99,
                  'G5': 783.99,
                  'G#5': 830.61,
                  'Ab5': 830.61,
                  'A5': 880.00,
                  'A#5': 932.33,
                  'Bb5': 932.33,
                  'B5': 987.77,
                  'C6': 1046.50,
                  'C#6': 1108.73,
                  'Db6': 1108.73,
                  'D6': 1174.66,
                  'D#6': 1244.51,
                  'Eb6': 1244.51,
                  'E6': 1318.51,
                  'F6': 1396.91,
                  'F#6': 1479.98,
                  'Gb6': 1479.98,
                  'G6': 1567.98,
                  'G#6': 1661.22,
                  'Ab6': 1661.22,
                  'A6': 1760.00,
                  'A#6': 1864.66,
                  'Bb6': 1864.66,
                  'B6': 1975.53,
                  'C7': 2093.00,
                  'C#7': 2217.46,
                  'Db7': 2217.46,
                  'D7': 2349.32,
                  'D#7': 2489.02,
                  'Eb7': 2489.02,
                  'E7': 2637.02,
                  'F7': 2793.83,
                  'F#7': 2959.96,
                  'Gb7': 2959.96,
                  'G7': 3135.96,
                  'G#7': 3322.44,
                  'Ab7': 3322.44,
                  'A7': 3520.00,
                  'A#7': 3729.31,
                  'Bb7': 3729.31,
                  'B7': 3951.07,
                  'C8': 4186.01
              };

              this.tabNotes = {
                // e string
                '0:0' : this.notes['E2'],
                '0:1' : this.notes['F2'],
                '0:2' : this.notes['F#2'],
                '0:3' : this.notes['G2'],
                '0:4' : this.notes['G#2'],
                '0:5' : this.notes['A2'],
                '0:6' : this.notes['A#2'],
                '0:7' : this.notes['B2'],
                '0:8' : this.notes['C3'],
                '0:9' : this.notes['C#3'],
                '0:10' : this.notes['D3'],
                '0:11' : this.notes['D#3'],
                '0:12' : this.notes['E3'],

                // a string
                '1:0' : this.notes['A2'],
                '1:1' : this.notes['A#2'],
                '1:2' : this.notes['B2'],
                '1:3' : this.notes['C3'],
                '1:4' : this.notes['C#3'],
                '1:5' : this.notes['D3'],
                '1:6' : this.notes['D#3'],
                '1:7' : this.notes['E3'],
                '1:8' : this.notes['F3'],
                '1:9' : this.notes['F#3'],
                '1:10' : this.notes['G3'],
                '1:11' : this.notes['G#3'],
                '1:12' : this.notes['A3'],

              };
            },

            onRender : function () {
                this.tabsView = new TabsEditor({
                    model : this.model,
                    template : 'create_shred_tabs_tmpl'
                });
                this.ui.tabs.append(this.tabsView.render().el);
                this.renderKeyboard();
            },

            renderKeyboard : function () {
                // Fix up prefixing
                // window.AudioContext = window.AudioContext || window.webkitAudioContext;
                // this.ctx = new AudioContext();
                this.arrNotes = [];
                this.$("use").mousedown(this.startNote);
                this.$("use").mouseup(this.stopNote);
                this.$("#playAll").click(this.playAll);
            },

            playNote : function (e) {
                var frq = notes[e.currentTarget.id], o = ctx.createOscillator(), g = ctx.createGain(),
                    bpm = parseInt($("#bpm").val()), notelength = parseFloat($("#noteLength").val()), playlength = 0;
                // $(e.currentTarget).attr("fill","yellow");
                o.type = $("#waveType").val();

                // 1 second divided by number of beats per second times number of beats (length of a note)
                playlength = 1/(bpm/60) * notelength;

                if (frq) {
                    // $("#note").val(e.currentTarget.id);
                    o.frequency.value = frq;
                    o.start(ctx.currentTime);
                    o.stop(ctx.currentTime + playlength);

                    g.gain.value = 1;
                    o.connect(g);
                    g.connect(ctx.destination);
                }
            },

            startNote : function (e, note) {
                //this.playNote(e);
                var frq = notes[e.currentTarget.id], thisNote = {}, notelength = parseFloat(that.$("#noteLength").val());
                $(e.currentTarget).attr("fill","yellow");

                if (frq) {
                    thisNote.notelength = notelength;
                    thisNote.frq = frq;
                    thisNote.noteLength = that.$("#noteLength option:selected").text();
                    $("#tblNotes tbody").append("<tr><td>"+e.currentTarget.id+"</td><td>"+thisNote.noteLength+"</td></tr>");
                    this.arrNotes.push(thisNote);
                }
            },

            pushNote : function (note) {
              // only save one note for now
              var frq;
              Object.keys(note.stringz).forEach(function(s) {
                frq = this.tabNotes[s + ':' + note.stringz[s]];
              }.bind(this));

              this.arrNotes.push({
                notelength : parseInt(note.rest, 10),
                frq : frq
              });
            },

            stopNote : function (e) {
                $(e.currentTarget).attr("fill", "inherit");
                that.$("#note").val("");
            },

            playAll : function (e, bpm) {
              window.AudioContext = window.AudioContext || window.webkitAudioContext;
              var ctx = new AudioContext();
                var o, t = ctx.currentTime,
                    arrayLength = this.arrNotes.length,
                    playlength = bpm; //, bpm = parseInt(that.$("#bpm").val());

                for (var i = 0; i < arrayLength; i++) {
                    o = ctx.createOscillator();
                    // 1 second divided by number of beats per second times number of beats (length of a note)
                    playlength = 1/(bpm/60) * this.arrNotes[i].notelength;
                    console.log(playlength + ' ' + this.arrNotes[i].frq);
                    o.type = 'sine';//this.$("#waveType").val();
                    o.frequency.value = this.arrNotes[i].frq;
                    o.start(t);
                    o.stop(t + playlength);
                    t += playlength;
                    o.connect(ctx.destination);
                }
            },

            __playTabsClicked : function () {
              var tabs = this.tabsView.getTabs();
              tabs.tabs.forEach(function(t) {
                this.pushNote(t);
              }.bind(this));
              this.playAll(null, tabs.tempo);
            },

            __keyboardClicked : function () {
                // this.$('.keyboard').toggle();
                if(this.keyboardVis) {
                    this.$('.keyboard').animate({'left' : '-2000px'}, 'fast');
                    this.keyboardVis = false;
                } else {
                    this.$('.keyboard').animate({'left' : '56px'}, 'fast');
                    this.keyboardVis = true;
                }
            },

            __saveTabslLicked : function () {
                var tabs = this.tabsView.getTabs();
                console.log('t: ' + JSON.stringify(tabs));
            }
        });

    });
