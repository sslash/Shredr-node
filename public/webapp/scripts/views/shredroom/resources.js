define([
	'backbone',
	'hbs!tmpl/shredroom/resources_tmpl'
],
function( Backbone, ResourcesTmpl  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.ItemView.extend({

		className : 'sr-region-inner',
		
		initialize: function() {
			console.log("initialize a Resources Itemview");
		},

		ui : {
			tab : "#tab-input"
		},

		events : {
			'click .arrow_box' : '__arrowClicked'
		},

		__arrowClicked : function() {
			this.trigger('arrow:event:click');
		},

		shred : {
			"tabs" : {
				"tempo" : "125",
				"tabs" : [
				{
					"rest" : 4,
					"stringz" : [
					{
						"0" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"0" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"0" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"0" : 4,
						"1" : 4,
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"0" : 10
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 2
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 2
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 2
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 1
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 1
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 1
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 1
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"3" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"4" : 4
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"5" : 5
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"3" : 0
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 4
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 4
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 4
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 4
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 4
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 4
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 4
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"4" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"4" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"4" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"4" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"4" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"4" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"4" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"4" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"4" : 2
					},
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 2
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : -1
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : -1
					},
					{
						"3" : -1
					},
					{
						"3" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 3
					}
					]
				},
				{
					"rest" : 8,
					"stringz" : [
					{
						"3" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 1
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 1
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 1
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 1
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 1
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 1
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 1
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"0" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"0" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"0" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"0" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"0" : 3
					},
					{
						"1" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 3
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 2
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 2
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 2
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"1" : 22
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 2
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 2
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 2
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 2
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 22
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 2
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : -1
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 2
					}
					]
				},
				{
					"rest" : 4,
					"stringz" : [
					{
						"2" : 2
					}
					]
				}
				]
			},
		},
		
    	template: ResourcesTmpl,

    	onDomRefresh : function() {
    		this.drawTabs();
        	//this.startTabRuler();
    	},

    	startTabRuler : function() {
    		var tempo = this.shred.tabs.tempo;
        	var bts_sec = tempo / 60; // beveg deg bts_sec firedels noter i sekundet
        	var draws_sec = bts_sec * (1*4); // 1/4 noter i sekundet * 16 = 1/64
        	var miliseconds_until_next_draw = 1000/draws_sec;

        	this.firstRest = this.shred.tabs.tempo * 2;
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
      		if ( !this.barsIndex ){
      			this.barsIndex = 0;
      		}
      		if (!this.shred.tabs) {
      			return false;
      		}

        	//this.prevBarsIndex = this.barsIndex;
	        var prevLeft = 0;
	        var that = this;
	        this.tabswidth = 540; //$('#bars').width(); TODO: get this value with JS
	        var tabs = this.shred.tabs.tabs;
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
	            var top = 9 + (le_string*14);
	            label.css('top', (top + "px") );

	            that.ui.tab.append(label);
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
