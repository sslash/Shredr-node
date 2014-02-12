var mongoose = require('mongoose'),
	config = require('../../config/config'),
	Schema = mongoose.Schema;


/**
 * Getters
 */

var getTags = function (tags) {
  return tags.join(',');
};

/**
 * Setters
 */

var setTags = function (tags) {
  return tags.split(',');
};

/**
 * Shred Schema
 */

var ShredSchema = new Schema({
  title: {type : String, default : '', trim : true},
  type: {type : String, default : '', trim : true},
  description: {type : String, default : '', trim : true},
  rating: {
    rating : {type : Number, default : 0 },
    raters : [] 
  },
  tabs: {},
  youtubeUrl : {type : String, default : '', trim : true},
  youtubeId : {type : String, default : '', trim : true},
  user: {type : Schema.ObjectId, ref : 'User'},
  comments: [{
    body: { type : String, default : '' },
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],
  tags: {type: [], get: getTags, set: setTags},
  createdAt  : {type : Date, default : Date.now}
});

/**
 * Validations
 */

ShredSchema.path('title').validate(function (title) {
  return title.length > 0;
}, 'Shred title cannot be blank');

ShredSchema.path('user').validate(function (user) {
  return typeof user !== "undefined" && user !== null ;
}, 'Shred must have an owner');


/**
 * Pre-remove hook
 */
ShredSchema.pre('remove', function (next) {
  // Do stuff before removing
  next();
});

/**
 * Instance Methods
 */
ShredSchema.methods = {

  /**
   * Save the shred
   *
   * @param {data} shred data 
   * @param {Function} cb
   * @api private
   */

  create: function (cb) {
   this.save(cb);
  },


  rate : function(user, rate, cb) {
    this.rating.raters.push(user._id);
    this.rating.rating += rate;
    this.save(cb);
  },

  /**
   * Add comment
   *
   * @param {User} user
   * @param {Object} comment
   * @param {Function} cb
   * @api private
   */

  addComment: function (user, comment, cb) {
    //var notify = require('../mailer/notify') // Email notify

    this.comments.push({
      body: comment.body,
      user: user._id
    });

    // notify.comment({
    //   article: this,
    //   currentUser: user,
    //   comment: comment.body
    // });

    this.save(cb);
  }

};


/**
 * Static functions
 */
ShredSchema.statics = {

  /**
   * Find Shred by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */
  findById: function (id, cb) {
    this.findOne({ _id : id })
      .populate('user')
      .populate('comments.user')
      .exec(cb);
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

    this.find(criteria)
      .populate('user')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(function(err, res) {
        cb(err,res);
      });
  }
};

mongoose.model('Shred', ShredSchema);