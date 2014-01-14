(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/battlesCollection'
		],
		function( Battlescollection ) {

			describe('Battlescollection Collection', function () {

				it('should be an instance of Battlescollection Collection', function () {
					var battlesCollection = new Battlescollection();
					expect( battlesCollection ).to.be.an.instanceof( Battlescollection );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );