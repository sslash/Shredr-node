define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		urlRoot : 'api/user/',
		
		initialize: function() {
			if ( this.get('_id') ) {
				this.id = this.get('_id');
			}
		},

		defaults: {
			description : 'Mandalore skywalker greedo cade grievous jade. Luuke greedo cade moff alderaan darth wicket yavin mace. Gonk yoda darth amidala maul. Jade skywalker c-3po ewok moff. Hutt kit mustafar gamorrean palpatine jango hutt yoda mara. Mace yavin utapau antilles kenobi lobot hutt calrissian padmé',
			location : 'Unkown',
			birthdate : 'Unkown',
			musicalDna : ['Dance Music', 'Kingsplyingharp', 'Hipster Jingles'],
			dateString : 'Unkown',
			profileImgUrl : 'https://secure.gravatar.com/avatar/0a14846a74c61c9cecb61887d492371c'
		},

		setDateString : function() {
			var d = this.get('birthdate');
			if ( d !== 'Unkown') {
				d = new Date(d);
				var curr_date = d.getDate();
				var curr_month = d.getMonth();
				var curr_year = d.getFullYear();
				var str = curr_date + '-' + curr_month + '-' + curr_year;
				this.set({'dateString': str});
			}
		}

	});
});
