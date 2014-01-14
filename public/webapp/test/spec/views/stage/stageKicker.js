(function() {
	'use strict';

	var root = this;

	root.define([
		'views/stage/stageKicker'
		],
		function( Stagekicker ) {

			describe('Stagekicker Itemview', function () {

				it('should be an instance of Stagekicker Itemview', function () {
					var stageKicker = new Stagekicker();
					expect( stageKicker ).to.be.an.instanceof( Stagekicker );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );