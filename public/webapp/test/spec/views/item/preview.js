(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/preview'
		],
		function( Preview ) {

			describe('Preview Itemview', function () {

				it('should be an instance of Preview Itemview', function () {
					var preview = new Preview();
					expect( preview ).to.be.an.instanceof( Preview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );