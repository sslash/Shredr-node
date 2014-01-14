(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/shredsCollection'
		],
		function( Shredscollection ) {

			describe('Shredscollection Collection', function () {

				it('should be an instance of Shredscollection Collection', function () {
					var shredsCollection = new Shredscollection();
					expect( shredsCollection ).to.be.an.instanceof( Shredscollection );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );