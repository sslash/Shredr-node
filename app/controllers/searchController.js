var mongoose   = require('mongoose'),
    Shred      = mongoose.model('Shred'),
    _          = require('underscore');


module.exports = function (app) {
  var es = app.elasticsearch;

  var health = function (req, res) {
    es.cluster.health(function (err, resp) {
      if (err)
        res.send(err.message);
      else
        res.send(resp);
    });
  };

  return {
    health: health
  };
};
