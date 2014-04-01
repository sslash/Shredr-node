var elasticsearch = require('elasticsearch');

var client = elasticsearch.Client({
  hosts: ['localhost:9200']
});

module.exports = function () {
  return client;
};
