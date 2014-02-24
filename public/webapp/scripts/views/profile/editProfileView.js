define([
	'backbone',

	// views
	'views/modal/registerSuccessModal'
],
function( Backbone, RegisterSuccessModal ) {
    'use strict';

	/* Return a Layout class definition */
	return RegisterSuccessModal.OnSuccessView.extend({

		__cancelClicked : function (e) {
			e.preventDefault();
			this.trigger('editProfile:canceled');
		},
		__doneDnaClicked : function(e) {
			e.preventDefault();
			console.log('saaaapp');

			// set guitars
			this.model.get('guitars').forEach(function(g) {
				this.guitars.push(g);
			}.bind(this));

			this.model.save({
				startedPlaying : this.$('#guitar-start').val(),
				location : this.$('#city').val(),
				birthdate : this.$('#birth').val(),
				guitars : this.guitars,
				bio : this.$('#bio').val(),
				musicDna : this.catecoriesSelected
			},{
				success : function(res) {
					console.log('hei ferdig');
					this.trigger('editProfile:success', res);
				}.bind(this),
				error : function(error){}
			});
		},
	});

});
