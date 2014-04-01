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

  var indexShreds = function (req, res) {
    Shred.find().exec(function (err, resp) {
      if (err) res.send(err, "500");
      var index = _.reduce(resp, function (memo, shred) {
        memo.push({index: {
          _index: "shredr",
          _type: "shred",
          _id: shred._id,
        }});
        memo.push({
          title: shred.title,
          description: shred.description,
          createdAt: shred.createdAt,
          type: shred.type,
          tags: shred.tags
        });
        return memo;
      }, []);
      es.bulk({body: index}, function (err, resp) {
        if (err) res.send(err, "500");
        res.send(resp);
      });
    });
  };

  var searchshreds = function (req, res) {
    var term = req.params.query;
    es.search({
      index: "shredr",
      type: "shred",
      body: {
        query: {
          boosting: {
              positive: {
                  multi_match: {
                     query: term,
                     fields: ["title", "description", "tags"]
                  }
              },
              negative: {
                  multi_match: {
                     query: term,
                     fields: ["description", "tags"]
                  }
              },
              negative_boost: 0.2
          }
        }
      },
      timeout: 10000
    }, function (err, resp) {
      if (err) return res.send(err.message);
      res.send(resp);
    });
  };

  return {
    health: health,
    indexShreds: indexShreds,
    searchshreds: searchshreds
  };
};
