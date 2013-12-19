(function() {
	'use strict';

	var root = this;

	root.define([
		'views/nav/main'
		],
		function( NavMain ) {

			describe('NavMain Itemview', function () {

				it('should be an instance of NavMain Itemview', function () {
					var nav/main = new NavMain();
					expect( nav/main ).to.be.an.instanceof( NavMain );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );