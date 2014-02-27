define([],
function() {
    'use strict';

    var Player = function (el, model) {
    	this.el = el;
    	this.model = model;
    };

    Player.prototype.changeVideo = function (model) {
    	this.model = model;
    	this.player.loadVideoById(model.get('youtubeId'));
    };

	// 3. This function creates an <iframe> (and YouTube player)
  	//    after the API code downloads.
    Player.prototype.onYouTubeIframeAPIReady = function () {
    	try {
    		this.player = new YT.Player(this.el, {
    			height: '390',
    			width: '640',
    			playerVars : {
    				autoplay : 1,
    				cc_load_policy : 0,
    				controls : 0,
    				fs : 0,
    				iv_load_policy : 3,
    				modestbranding : 1,
    				rel : 0,
    				showinfo : 0,
    			},
    			videoId: this.model.get('youtubeId'),
    			events: {
    				'onReady': this.onPlayerReady.bind(this),
    				'onStateChange': this.onPlayerStateChange.bind(this)
    			}
    		});
    	}catch(e) {
    		console.log('error ' + e);
    		setTimeout(this.onYouTubeIframeAPIReady.bind(this), 50);
    	}
    };

  	// 4. The API will call this function when the video player is ready.
    Player.prototype.onPlayerReady = function(event) {
    	// event.target.playVideo();
    	// this.renderDuration();
  	};

  	// 5. The API calls this function when the player's state changes.
	Player.prototype.onPlayerStateChange = function(event) {
		var that = this;
        if (event.data == YT.PlayerState.PLAYING && !this.done) {
      		that.done = true;
    	}
  	};
      	
	Player.prototype.stopVideo = function () {
  		this.player.stopVideo();
  	};

  	return Player;

});
