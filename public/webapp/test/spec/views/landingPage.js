(function() {
	'use strict';

	var root = this;

	root.define([
		'views/landingPage'
		],
		function( Landingpage ) {

			describe('Landingpage View', function () {

				it('should be an instance of Landingpage View', function () {
					var landingPage = new Landingpage();
					expect( landingPage ).to.be.an.instanceof( Landingpage );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );