(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/Tabs'
		],
		function( Tabs ) {

			describe('Tabs Itemview', function () {

				it('should be an instance of Tabs Itemview', function () {
					var Tabs = new Tabs();
					expect( Tabs ).to.be.an.instanceof( Tabs );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );