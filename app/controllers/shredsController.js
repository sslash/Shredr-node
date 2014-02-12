/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Shred = mongoose.model('Shred'),
  _ = require('underscore');

exports.get = function(req, res) {

  var _id = req.params.id;

  Shred.findById(_id, function (err, shred) {
    if (err) { return res.send(err, '500'); }
    if (!shred){ return res.send({'error' : 'Not found'}, '401'); }

    return res.send(shred);
  });
}


/**
 * List
 */
exports.list = function(req, next){
  var page = req.param('page');
  if ( !page ) { page = 1;}
  page = (page > 0 ? page : 1) - 1;
  var perPage = 32;
  var options = {
    perPage: perPage,
    page: page
  };

  Shred.list(options, function(err, shreds) {

    if ( err ) { next({}, err); }

    Shred.count().exec(function (err, count) {
      if (err) { next({}, err) }
      next(shreds);
    });    
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

/**
 * Find by Id. Used by other controllers
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