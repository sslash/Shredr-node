/*!
 * Module dependencies
 */
 var mongoose     = require('mongoose'),
      Schema      = mongoose.Schema,
      crypto	    = require('crypto'),
      Shred       = mongoose.model('Shred'),
      _           = require('underscore'),
      authTypes   = [],
      userPlugin  = require('mongoose-user');

/**
 * User schema
 */
 var UserSchema = new Schema({
 	email: { type: String, default: '' },
 	username: { type: String, default: '' },
  location: { type: String, default: '' },
  birthdate: {type : Date},
  guitars : {type: []},
  conversations : {type:[]},
  startedPlaying : {type: String, default: ''},
  musicDna : {type: []},
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
 	this._password = password
 	this.salt = this.makeSalt()
 	this.hashed_password = this.encryptPassword(password)
 })
 .get(function() { return this._password })

/**
 * Validations
 */

 var validatePresenceOf = function (value) {
 	return value && value.length
 }


// the below 4 validations only apply if you are signing up traditionally

UserSchema.path('username').validate(function (username) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true
  	return username.length
}, 'Username cannot be blank')

UserSchema.path('email').validate(function (email) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true
  	return email.length
}, 'Email cannot be blank')

UserSchema.path('email').validate(function (email, fn) {
	var User = mongoose.model('User')

  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) fn(true)

  // Check only when it is a new user or when email field is modified
if (this.isNew || this.isModified('email')) {
	User.find({ email: email }).exec(function (err, users) {
		fn(!err && users.length === 0)
	})
} else fn(true)
}, 'Email already exists')

UserSchema.path('username').validate(function (username) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true
  	return username.length
}, 'Username cannot be blank')

UserSchema.path('hashed_password').validate(function (hashed_password) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true
  	return hashed_password.length
}, 'Password cannot be blank')


/**
 * Pre-save hook
 */

 UserSchema.pre('save', function(next) {
 	if (!this.isNew) return next()

 		if (!validatePresenceOf(this.password)
 			&& authTypes.indexOf(this.provider) === -1)
 			next(new Error('Invalid password'))
 		else
 			next()
 	})

/**
 * Methods
 */

 UserSchema.methods = {

sendMessage : function(fromUserId, body, cb) {
  var conv, newMessage;

  // look for an existing conversation with these two communicators
  this.conversations.forEach(function(c) {
    if ( c.initiatorId === fromUserId) {
      conv = c; return false;
    }
  });


  // create the conversation object, if it wasn't found
  if(!conv) {
    conv = {};
    conv.initiatorId = fromUserId;
    conv.messages = [];
    this.conversations.push(conv);
  }

  // Create the message
  newMessage = {
    timestamp : new Date(),
    body : body,

    // if message is from the originator, from = 0, else from = 1; 
    from : conv.initiatorId === fromUserId ? 0 : 1
  };

  conv.messages.push(newMessage);

  this.update({conversations : this.conversations}, cb);
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
   		encrypred = crypto.createHmac('sha1', this.salt).updatePass(password).digest('hex')
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
  }
}

mongoose.model('User', UserSchema)