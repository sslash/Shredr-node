(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/landingPage'
		],
		function( Landingpage ) {

			describe('Landingpage Itemview', function () {

				it('should be an instance of Landingpage Itemview', function () {
					var landingPage = new Landingpage();
					expect( landingPage ).to.be.an.instanceof( Landingpage );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );