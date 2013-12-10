var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'shredr-node'
    },
    port: 3000,
    db: 'mongodb://localhost/shredr-node-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'shredr-node'
    },
    port: 3000,
    db: 'mongodb://localhost/shredr-node-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'shredr-node'
    },
    port: 3000,
    db: 'mongodb://localhost/shredr-node-production'
  }
};

module.exports = config[env];
