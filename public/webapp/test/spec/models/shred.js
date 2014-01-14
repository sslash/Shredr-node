(function() {
	'use strict';

	var root = this;

	root.define([
		'models/shred'
		],
		function( Shred ) {

			describe('Shred Model', function () {

				it('should be an instance of Shred Model', function () {
					var shred = new Shred();
					expect( shred ).to.be.an.instanceof( Shred );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );