(function() {
	'use strict';

	var root = this;

	root.define([
		'models/battle'
		],
		function( Battle ) {

			describe('Battle Model', function () {

				it('should be an instance of Battle Model', function () {
					var battle = new Battle();
					expect( battle ).to.be.an.instanceof( Battle );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );