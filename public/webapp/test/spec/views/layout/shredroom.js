(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/shredroom'
		],
		function( Shredroom ) {

			describe('Shredroom Layout', function () {

				it('should be an instance of Shredroom Layout', function () {
					var shredroom = new Shredroom();
					expect( shredroom ).to.be.an.instanceof( Shredroom );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );