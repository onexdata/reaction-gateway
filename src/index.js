// Looks like we must do this here unfortunately...
global.isMain = require.main === module;

// Set the default configuration...
var CONFIG = require('config');
CONFIG.util.setModuleDefaults('reactor', require('./config.js'));


// process.env['NODE_CONFIG'] = JSON.stringify( { server: { build: 9 } } );

// Get the app configuration...
const config = require('config');

// Draw the logo...
console.log(config.reactor.server.logo);

const app = require('./inc/start')( config );
module.exports = {
  app: app,
  util: require('./inc/util'),
  config: config
};
