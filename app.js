var express     = require('express'),
	mongoConfig = require('./config/mongoConfig'),
	mongoose    = mongoose || require('mongoose'),
	schema      = mongoose.Schema,
	passport    = require('passport'),
	fs          = require('fs'),
	config      = require('./config/config');

var modelsPath = __dirname + '/app/models';

mongoConfig.connectToMongo();


fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

require('./config/passport')(passport, config);

var app = express();

require('./config/express')(app, config, passport);
require('./config/routes')(app, passport);

// Logging
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

app.listen(config.port, function(){
	console.log('Shredr is running. Port: ' + config.port);
});

module.exports = app;