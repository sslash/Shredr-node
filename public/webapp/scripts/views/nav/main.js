define([
	'backbone',
	'hbs!tmpl/nav/main_tmpl'
],
function( Backbone, NavMainTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a NavMain ItemView :" + window.Shredr);
			Shredr.vent.on('stage:thumbclicked:fadeout', this.rotateLogo.bind(this));
		},
		
    	template: NavMainTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {},

		rotateLogo : function() {
			var $elie = $(".logo-small"), degree = 30, timer, countDown = 4, ticks = 1;
			console.log('will rotate');
			rotate();
			function rotate() {

				$elie.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});  
				$elie.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
				countDown--;

				timer = setTimeout(function() {
					degree *= -1;
					rotate();
				},200);

				if (countDown === 0){
					clearTimeout(timer);
					$elie.css({ WebkitTransform: 'rotate(0deg'});  
					$elie.css({ '-moz-transform': 'rotate(0deg)'});
				 	Shredr.vent.trigger('stage:thumbclicked:afterReorder');
				}
			}
		}
	});

});
