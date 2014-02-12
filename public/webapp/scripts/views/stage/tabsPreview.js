define([
	'backbone',
	'hbs!tmpl/stage/tabsPrev_tmpl'
],
function( Backbone, TabsPrev  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({
		
		initialize: function(options) {
      // Must render on this event, in order to get the correct size of the tabs image
      Shredr.vent.on('stage:thumbclicked:afterReorder', this.drawTabs.bind(this));
		},
		
		template: TabsPrev,
    ui : {
      tab : "#tab-input"
    },

  	startTabRuler : function() {
  		var tempo = this.model.get('tabs').tempo;
      	var bts_sec = tempo / 60; // beveg deg bts_sec firedels noter i sekundet
      	var draws_sec = bts_sec * (1*4); // 1/4 noter i sekundet * 16 = 1/64
      	var miliseconds_until_next_draw = 1000/draws_sec;

      	this.firstRest = this.model.get('tabs').tempo * 2;
      	var widthInterval = 1148 / (4*16); // bredde per bevegelse. vet ikke hvorfor 1140 gir riktig bredde
      	this.currWidthInterval = this.tabswidth / (firstRest*4) - 5;
      	var that = this;

      	this.antallRulerMvmnts = 4*16;
      	setInterval(function(){
      		antallRulerMvmnts --;
      		if (antallRulerMvmnts == 0) {
      			that.redrawTabs();            
      		}
      		that.drawRuler(that.currWidthInterval);
      		that.currWidthInterval += widthInterval;
      	}, miliseconds_until_next_draw);
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
          var that = this;

      		if ( !this.barsIndex ){
      			this.barsIndex = 0;
      		}
      		if (!this.model.get('tabs')) {
      			return false;
      		}

	        var prevLeft = 0;
	        
	        this.tabswidth = this.$('img').width();
          this.tabsHeight = (this.$('.tabsArea img').height()/6) - 2.5;
	        var tabs = this.model.get('tabs').tabs;
	        var prevRest = tabs[0].rest * 2; // Start from 32 px left margin

	        for (var barsCounter = 0; (this.barsIndex < tabs.length && barsCounter < 4); this.barsIndex ++ ){
	        	var tab = tabs[this.barsIndex];
	        	barsCounter += 1/tab.rest;

	        	prevLeft = Math.round(( this.tabswidth / (prevRest*4)) + prevLeft);
	        	prevRest = tab.rest;

	        	_.each(tab.stringz, function(obj) {
	        		var le_string = Object.keys(obj)[0];
	        		var label = $("<label class='note' title='" +tab.rest + "'>" + obj[le_string] + "</label>");
	        		label.css('left', (prevLeft + "px") );

	            // first 9 = top offset. Multiplier 10 = offset between lines
	            var top = that.tabsHeight-6 + (le_string*that.tabsHeight);
	            label.css('top', (top + "px") );

	            that.$('#tab-input').append(label);
	        });             
	        }
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
