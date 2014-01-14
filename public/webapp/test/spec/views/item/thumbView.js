(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/thumbView'
		],
		function( Thumbview ) {

			describe('Thumbview Itemview', function () {

				it('should be an instance of Thumbview Itemview', function () {
					var thumbView = new Thumbview();
					expect( thumbView ).to.be.an.instanceof( Thumbview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );