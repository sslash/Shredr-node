define([
	'backbone',
	'hbs!tmpl/stage/tabsPrev_tmpl'
],
function( Backbone, TabsPrev  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

    barsIndex : 0,
		
		initialize: function(options) {
      // Must render on this event, in order to get the correct size of the tabs image
      this.tabs = this.model.get('tabs').tabs;
      Shredr.vent.on('stage:thumbclicked:afterReorder', this.drawTabs.bind(this));
		},
		
		template: TabsPrev,
    ui : {
      tab : '[data-model="tab-input"]',
      tabsArea : '[data-region="tabs"]'
    },

    // Playback

  	startTabRuler : function() {
  		  var tempo = this.model.get('tabs').tempo;
      	var bts_sec = tempo / 60; // beveg deg bts_sec firedels noter i sekundet
      	var draws_sec = bts_sec * (1*4); // 1/4 noter i sekundet * 16 = 1/64
      	var miliseconds_until_next_draw = 1000/draws_sec;

      	this.firstRest = this.model.get('tabs').tempo * 2;
      	var widthInterval = 1148 / (4*16); // bredde per bevegelse. vet ikke hvorfor 1140 gir riktig bredde
      	this.currWidthInterval = this.tabswidth / (firstRest*4) - 5;

      	this.antallRulerMvmnts = 4*16;
      	setInterval(function(){
      		antallRulerMvmnts --;
      		if (antallRulerMvmnts == 0) {
      			this.redrawTabs();            
      		}
      		this.drawRuler(this.currWidthInterval);
      		this.currWidthInterval += widthInterval;
      	}.bind(this), miliseconds_until_next_draw);
      },

      redrawTabs : function() {
      	this.currWidthInterval = this.tabswidth / (this.firstRest*4) - 5;
      	$('.note').remove();
      	this.drawBackground();
      	this.antallRulerMvmnts = 4*16;
      },


  		/**************************************************************
      	*                         CREATE TABS                         *
      	***************************************************************/
      	drawTabs : function() {
      		this.drawBackground();
      	},

      	drawBackground : function(){
          if (!this.tabs) { return false; }

	        var prevLeft = 0;
          var topOffset = 0;
          var rect = this.el.getBoundingClientRect();
	        this.tabswidth = rect.width - 24; // 24 is left and right margin
          this.tabsHeight = (85/6) -2; // img is set to 85px. -2 just works...
	        
	        var prevRest = this.tabs[0].rest * 2; // Start from 32 px left margin

	        for (var barsCounter = 0; (this.barsIndex < this.tabs.length); this.barsIndex++ ){
	        	var tab = this.tabs[this.barsIndex];
	        	barsCounter += 1/tab.rest;

	        	prevLeft = Math.round(( this.tabswidth / (prevRest*4)) + prevLeft);
	        	prevRest = tab.rest;

	        	tab.stringz.forEach(function(obj) {
	        		var le_string = Object.keys(obj)[0];
	        		var label = $("<label class='note' title='" +tab.rest + "'>" + obj[le_string] + "</label>");

	            // first 9 = top offset. Multiplier 10 = offset between lines
	            var top = this.tabsHeight +10 + (le_string*this.tabsHeight) + topOffset;
	            label.css({
                'top': (top + 'px'),
                'left': (prevLeft + "px") 
              });
	            this.ui.tab.append(label);
            }.bind(this)); 

            if(barsCounter % 4 === 0 ) {
              this.appendNoteImg();
              prevLeft = 0;
              topOffset += rect.height -18; // -18 just works...
            }            
	        }
    	},

      appendNoteImg : function () {
        this.ui.tabsArea.append('<div class="tabs-row"><img src="img/tabs.png" class="tabs-img">\
          <div data-model="tab-input" id="tab-input">\
          <canvas id="bars" style="width:540;"></canvas>\
          </div></div>');
      },

    	drawRuler : function(nextWidth){
    		var ruler=document.getElementById("bars");
    		ruler.width  = 1370;
    		this.rulerHeight = 126; 
    		this.currRulerX = 0;

    		this.ctx = ruler.getContext("2d");
    		this.ctx.clearRect(0, 0, ruler.width, ruler.height);
    		this.ctx.strokeStyle='#cc0000';
    		this.ctx.lineWidth = 2;


    		this.ctx.beginPath();
    		this.ctx.moveTo(nextWidth,0);
    		this.ctx.lineTo(nextWidth,this.rulerHeight);
    		this.ctx.stroke();
    	}
	});

});
