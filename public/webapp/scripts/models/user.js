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
			profileImgFile : 'img/shredder.jpg'
		},

		parse : function (attr) {
			if ( !attr.profileImgFile || attr.profileImgFile.length === 0 ) {
				attr.profileImgFile = this.get('profileImgUrl');
			} else {
				if (!(attr.profileImgFile.match(/img\/profiles\//)) ) {
					attr.profileImgFile = 'img/profiles/' + attr.profileImgFile;
				}
			}

			return attr;
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
		},

		postMsg : function (opts) {
			var that = this;
			$.post(opts.url, opts.body)
			.done(function(res) {
				that.trigger(opts.event + ':success', res);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				that.trigger(opts.event + ':fail', textStatus);
			});
		},

		// Send a message from Shredr.user to this.
		sendMessage : function (msgBody) {
			this.postMsg({
				url : this.url() + '/sendMessage',
				body : {body : msgBody},
				event : 'message:sent'
			});
		},

		deleteNotification : function (notificationId) {
			this.postMsg({
				url : this.url() + '/deleteNotification/' + notificationId,
				body : {},
				event : 'notification:deleted'
			});
		},

		addFan : function (faneeId) {
			this.postMsg({
				url : this.url() + '/addFan/' + faneeId,
				body : {},
				event : 'fane:add'
			});
		}
	});
});
