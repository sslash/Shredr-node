(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/nav'
		],
		function( Nav ) {

			describe('Nav Itemview', function () {

				it('should be an instance of Nav Itemview', function () {
					var nav = new Nav();
					expect( nav ).to.be.an.instanceof( Nav );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );