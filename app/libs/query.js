var mongoose    = require('mongoose'),
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

module.exports.ShredsQuery = ShredsQuery;
module.exports.UsersQuery = UsersQuery;