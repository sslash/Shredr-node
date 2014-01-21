(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/backtrack'
		],
		function( Backtrack ) {

			describe('Backtrack Itemview', function () {

				it('should be an instance of Backtrack Itemview', function () {
					var backtrack = new Backtrack();
					expect( backtrack ).to.be.an.instanceof( Backtrack );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );