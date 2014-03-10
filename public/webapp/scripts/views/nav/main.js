define([
	'backbone',
	'hbs!tmpl/nav/main_tmpl',
	'hbs!tmpl/nav/stdSubTmpl_nav',
	'hbs!tmpl/nav/shredroom_nav',
	],
	function( Backbone, NavMainTmpl, StdSubTmpl, ShredroomNavTmpl ) {
		'use strict';

		return Backbone.Marionette.ItemView.extend({

			initialize: function(options) {
				options = options || {};
				Shredr.vent.on('stage:thumbclicked:fadeout', this.rotateLogo.bind(this));

				// decide which sub template to render inside the navigation
				this._setSubTmpl(options.subTmpl || '', options.subCat || null);
			},

			template: NavMainTmpl,

			/* ui selector cache */
			ui: {
				categories : '[data-region="categories"]'
			},

			/* Ui events hash */
			events: {},

			/* on render callback */
			onRender: function() {
				this.ui.categories.children().remove();
				this.ui.categories.append(this.subTmpl);
			},

			onShow : function () {
				if (this.subCat) {
					var $container = this.$('[data-model="subcat"]');
					$container.text(this.subCat);
					$container.show('fast');
				}
			},

			_setSubTmpl : function (subTmpl, subCat) {
				if ( subTmpl === 'shredroom' ) {
					this.subTmpl = ShredroomNavTmpl;

					// std
				} else {
					this.subTmpl = StdSubTmpl;
				}

				// set sub category
				if (subCat) {
					this.subCat = subCat;
				} else {
					this.subCat = null;
				}
			},

			setSubTmpl : function (subTmpl, subCategory) {
				this._setSubTmpl(subTmpl, subCategory);
			},

			// setShredroomNav : function (subCategory) {
			// 	this.ui.categories.children().fadeOut('fast', function() {
			// 		this.ui.categories.append(ShredroomNavTmpl);
			// 		if ( subCategory ) {
			// 			console.log('sap')
			// 			this.ui.subCat.text(subCategory);
			// 			this.ui.subCat.fadeIn('fast');
			// 		}
			// 	}.bind(this));
			// },

			rotateLogo : function() {
				var $elie = $(".logo-small"), degree = 30, timer, countDown = 4, ticks = 1;
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
