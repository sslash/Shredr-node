(function() {
	'use strict';

	var root = this;

	root.define([
		'views/collection/thumbsColl'
		],
		function( Thumbscoll ) {

			describe('Thumbscoll Collectionview', function () {

				it('should be an instance of Thumbscoll Collectionview', function () {
					var thumbsColl = new Thumbscoll();
					expect( thumbsColl ).to.be.an.instanceof( Thumbscoll );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );