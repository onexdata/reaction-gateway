// Looks like we must do this here unfortunately...
global.isMain = require.main === module;

// Set the default configuration...
var CONFIG = require('config');
CONFIG.util.setModuleDefaults('acter', require('./config.js'));


// process.env['NODE_CONFIG'] = JSON.stringify( { server: { build: 9 } } );

// Get the app configuration...
const config = require('config');

const chalk = require('chalk');

// Set the debug mode...
process.env.debug = config.acter.server.debug;

// Draw the logo...
console.log(chalk[config.acter.server.branding.color](config.acter.server.branding.logo));

const app = require('./inc/start')( config );
module.exports = {
  app: app,
  util: require('./inc/util'),
  config: config
};
