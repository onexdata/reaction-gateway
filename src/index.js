// Defines if this module is the main module (will be false if running as someone elses required package)
global.isMain = require.main === module

// Set the default configuration...
var CONFIG = require('config')
CONFIG.util.setModuleDefaults('acter', require('./config.js'))

// Get the app configuration...
const config = require('config')
const chalk = require('chalk')

// Set the debug mode...
process.env.debug = config.acter.server.debug

// Draw the logo...
console.log(chalk[config.acter.server.branding.color](config.acter.server.branding.logo))

const util = require('./inc/util');

// Define the core...
const core = { config, util }
const app = require('./inc/start')( core )
module.exports = { app, util, config }
