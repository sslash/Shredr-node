/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Shred = mongoose.model('Shred'),
  _ = require('underscore');

/**
 * Find by Id
 */
exports.findById = function(req, res, next, id){
  var User = mongoose.model('User');

  Shred.findById(id, function (err, shred) {
    if (err) { return next(err); }
    if (!shred) { return next(new Error('not found')); }
    req.shred = shred;
    next();
  });
};


/**
 * List
 */
exports.list = function(req, res){
  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
  var perPage = 30;
  var options = {
    perPage: perPage,
    page: page
  };

  Shred.list(options, function(err, shreds) {
    if (err) { return res.render('500'); }

    res.render(shreds);
  });
};


/**
 * Create a Shred
 */

exports.create = function (req, res) {
  console.log("create " + req.user);
  var shred = new Shred(req.body);
  shred.user = req.user;

  shred.create(function (err) {
    if (!err) {
      return res.json(shred, 200);
    }else{
      return res.json({err : err}, 400);
    }
  });
};


/**
 * Update article
 */

exports.update = function(req, res){
  var shred = req.shred;
  shred = _.extend(shred, req.body);

  article.save(function(err) {
     if (!err) {
      return res.render(shred);
    }else{
      return res.sender({}, 400);
    }
  });
};


/**
 * Delete a Shred
 */
exports.destroy = function(req, res){
  var shred = req.shred;
  shred.remove(function(err){
    res.render({}, 200);
  });
};