var express     = require('express'),
	mongoConfig = require('./config/mongoConfig'),
	mongoose    = mongoose || require('mongoose'),
	schema      = mongoose.Schema,
	passport    = require('passport'),
	fs          = require('fs'),
	config      = require('./config/config'),
	elasticsearch = require('./config/elasticsearch');

var modelsPath = __dirname + '/app/models';

mongoConfig.connectToMongo();


fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

require('./config/passport')(passport, config);

var app = express();

app.elasticsearch = elasticsearch();

require('./config/express')(app, config, passport);
require('./config/routes')(app, passport);

// Logging
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

var port = process.env.PORT || 5000;
app.listen(port, function(){
	console.log('Shredr is running. Port: ' + port);
});

module.exports = app;
