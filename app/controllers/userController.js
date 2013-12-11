var mongoose = require('mongoose'),
	User = mongoose.model('User');



exports.index = function(req,res){
	var user = {};
	if ( req.session.passport.user ){
		var userId = req.session.passport.user;
		User.findOne({ _id: userId }, function (err, doc) {
        	if (doc){
        		user = doc;
        	}
    		res.render('index', {user: user});
        });
	}else{
		res.render('index', {user: user});
	}
};

exports.register = function(req, res){
	console.log("register: " + JSON.stringify(req.body));
	var user = new User(req.body)
	user.provider = 'local'
	user.save(function (err) {
		if (err) {
			console.log("ERROR: " +JSON.stringify(err) + "::" + utils.errors(err.errors));
			return res.send(err.errors);
		}else{
			res.send(user);
		}
	});
};

var login = function (req, res) {
  // if (req.session.returnTo) {

  //   res.send(req.session.returnTo)
  //   console.log("delete and return");
  //   delete req.session.returnTo
  //   return;
  // }
  res.send(req.user);
}


exports.login = function(req,res){

}

exports.logout = function(req,res){
	
}

exports.signup = function(req,res){
	
}

exports.show = function(req,res){
	
}

/**
 * Session
 */
exports.session = login;

exports.signin = function(req,res){
	
}

exports.authCallback = function(req,res){
	
}

exports.user = function(req,res){
	
}