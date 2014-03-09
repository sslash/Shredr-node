'use strict';
/*!
 * Module dependencies
 */
var mongoose     = require('mongoose');
var Schema      = mongoose.Schema;
var Crypto	    = require('crypto');
var Shred       = mongoose.model('Shred');
var _           = require('underscore');
var authTypes   = [];
var Q           = require('q');
var userPlugin  = require('mongoose-user');

/**
 * User schema
 */
 var UserSchema = new Schema({
 	email: { type: String, default: '' },
 	username: { type: String, default: '' },
  location: { type: String, default: '' },
  birthdate: {type : Date},
  guitars : {type: []},
  startedPlaying : {type: String, default: ''},
  musicDna : {type: []},
  fanees: [{
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],
  fans: [{
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],

  notifications : {type:[]},
  bio : {type: String, default: ''},
  profileImgFile: { type: String, default: '' },
 	provider: { type: String, default: '' },
 	hashed_password: { type: String, default: '' },
 	salt: { type: String, default: '' },
  shreds: {type: []},
 	authToken: { type: String, default: '' }
 });

/**
 * Virtuals
 */

 UserSchema
 .virtual('password')
 .set(function(password) {
 	this._password = password;
 	this.salt = this.makeSalt();
 	this.hashed_password = this.encryptPassword(password);
 })
 .get(function() { return this._password; })

/**
 * Validations
 */

var validatePresenceOf = function (value) {
 	return value && value.length;
}


// the below 4 validations only apply if you are signing up traditionally

UserSchema.path('username').validate(function (username) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true
  	return username.length;
}, 'Username cannot be blank')

UserSchema.path('email').validate(function (email) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true
  	return email.length;
}, 'Email cannot be blank')

UserSchema.path('email').validate(function (email, fn) {
	var User = mongoose.model('User');

  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) fn(true);

  // Check only when it is a new user or when email field is modified
if (this.isNew || this.isModified('email')) {
	User.find({ email: email }).exec(function (err, users) {
		fn(!err && users.length === 0);
	})
} else fn(true)
}, 'Email already exists')

UserSchema.path('username').validate(function (username) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true
  	return username.length;
}, 'Username cannot be blank')

UserSchema.path('hashed_password').validate(function (hashed_password) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true
  	return hashed_password.length;
}, 'Password cannot be blank')


/**
 * Pre-save hook
 */

 UserSchema.pre('save', function(next) {
 	if (!this.isNew) return next();

 		if (!validatePresenceOf(this.password)
 			&& authTypes.indexOf(this.provider) === -1)
 			next(new Error('Invalid password'));
 		else
 			next();
 	})

/**
 * Methods
 */

 UserSchema.methods = {

addNotification : function (opts) {
  var deferred = Q.defer();
  this.notifications.push({
    type : getNotificationTypeById(opts.type),
    body : opts.body,
    id  : new Date().getTime(),
    referenceId : opts.referenceId
  });

  this.update({notifications : this.notifications},function(err,res) {
    if (err) { deferred.reject(err); }
    else { deferred.resolve(res); }
  });
  return deferred.promise;
},

addFanee : function (faneeId) {
 var deferred = Q.defer();
 var fanees = this.fanees;
 fanees.push({user : faneeId});
 this.update({fanees : fanees}, function(err,res){
  if (err) { deferred.reject(err); }
  else { deferred.resolve(res); }
});
 return deferred.promise;
},

addFan : function (fan) {
   var deferred = Q.defer();
   var fans = this.fans;
   fans.push({user : fan._id});
   this.update({fans : fans}, function(err,res){
    if (err) { deferred.reject(err); }
    else { 
      return this.addNotification({
        type : 2,
        body : 'You got a new fan: ' + fan.username
      });
    }
  });
   return deferred.promise;
},

updatePass: function (cb) {
    return this.save(cb);
  },

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
   authenticate: function (plainText) {
   	return this.encryptPassword(plainText) === this.hashed_password
   },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
   makeSalt: function () {
   	return Math.round((new Date().valueOf() * Math.random())) + ''
   },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
   encryptPassword: function (password) {
   	if (!password) return ''
   		var encrypred
   	try {
   		encrypred = Crypto.createHmac('sha1', this.salt).update(password).digest('hex')
   		return encrypred
   	} catch (err) {
   		return ''
   	}
   }
}


UserSchema.statics = {
  load : function (id, cb) {
    this.findOne({ _id : id })
      .exec(function(err,res) {
        Shred.getShredsByUserId (id, function(err, shreds) {
          res.shreds = shreds;
          cb(err, res);
        });
      })
  },

  loadSimple : function(id) {
    var deferred = Q.defer();
    this.findOne({_id : id}).exec(function(err, res) {
      if (err) { deferred.reject(err); }
      else { deferred.resolve(res); }
    });

    return deferred.promise;
  },

  /**
   * List shreds
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */
  list: function (options, cb) {
    var criteria = options.criteria || {};
    var populate = options.populate || '';

    this.find(criteria)
      .populate(populate)
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(function(err, res) {
        cb(err,res);
      });
  },
}

// Helpers
function getNotificationTypeById (id) {
    if ( id === 1 ) {
      return 'New Message';
    } else if ( id === 2 ) {
      return 'New Fan';
    }
};
mongoose.model('User', UserSchema)