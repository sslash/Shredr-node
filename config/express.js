var express     = require('express'),
    mongoStore  = require('connect-mongo')(express),
    mongoConfig = require('./mongoConfig'),
    pkg         = require('../package'),
    exphbs      = require('express3-handlebars'),
    winston     = require('winston'),
    expressWinston = require('express-winston');

module.exports = function (app, config, passport) {
  app.set('showStackError', true);

  // use express favicon
  //app.use(express.favicon())

  app.use(express.static(config.root + '/public'));
  app.use(express.logger('dev'));

  // express-winston logger makes sense BEFORE the router.
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      })
    ]
  }));

  // views config
  app.engine('.hbs', exphbs({extname: '.hbs'}));
  app.set('view engine', '.hbs');

  app.set('views', config.root + '/app/views');

  app.configure(function () {
    // bodyParser should be above methodOverride
    app.use(express.bodyParser({uploadDir:'./uploads'}));
    app.use(express.methodOverride());

    // cookieParser should be above session
    app.use(express.cookieParser());
    app.use(express.session({
      secret: pkg.name,
      store: new mongoStore({
        url: mongoConfig.getDbUrl(),
        collection : 'sessions'
      })
    }));

    // Passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // routes should be at the last
    app.use(app.router);

    // express-winston errorLogger makes sense AFTER the router.
    app.use(expressWinston.errorLogger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ]
    }));

    app.use(function (req, res, next) {
      res.status(404).render('404', { url: req.originalUrl });
    });
  });

  // development specific stuff
  app.configure('development', function () {
    app.locals.pretty = true;
  });

  // staging specific stuff
  app.configure('staging', function () {
    app.locals.pretty = true;
  });
};
