(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/Upload'
		],
		function( Upload ) {

			describe('Upload Itemview', function () {

				it('should be an instance of Upload Itemview', function () {
					var Upload = new Upload();
					expect( Upload ).to.be.an.instanceof( Upload );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );