(function() {
	'use strict';

	var root = this;

	root.define([
		'views/stage/stage'
		],
		function( Stage ) {

			describe('Stage Layout', function () {

				it('should be an instance of Stage Layout', function () {
					var stage = new Stage();
					expect( stage ).to.be.an.instanceof( Stage );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );