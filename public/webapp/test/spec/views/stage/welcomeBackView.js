(function() {
	'use strict';

	var root = this;

	root.define([
		'views/stage/welcomeBackView'
		],
		function( Welcomebackview ) {

			describe('Welcomebackview Itemview', function () {

				it('should be an instance of Welcomebackview Itemview', function () {
					var welcomeBackView = new Welcomebackview();
					expect( welcomeBackView ).to.be.an.instanceof( Welcomebackview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );