var mongoose    = require('mongoose'),
	client = require('../libs/responseClient'),
	Shred 		= mongoose.model('Shred'),
	User 		= mongoose.model('User');

var ShredsQuery = {
	query : function (query, next) {
		var options = {
			query : {},
			page : 0,
			perPage : 20,
			populate : 'user'
		};
		options.query.type = query.type;
		Shred.list(options, next);
	}
};

var UsersQuery = {
	query : function (query, next) {
		var options = {
			criteria : {},
			page : 0,
			perPage : 20
		};
		options.criteria.username = query.username;
		User.list(options, next);
	}
}

// TODO: make user query and shreds query use this function
var query = function (Model, query, opts, res) {
	var options = {
		criteria : opts.criteria || {},
		populate : opts.populate || '',
		page : opts.page || 0,
		perPage : opts.perPage || 0
	};

	return Model.list(options, client.send.bind(null, res));
};

module.exports.ShredsQuery = ShredsQuery;
module.exports.UsersQuery = UsersQuery;
module.exports.query = query;
