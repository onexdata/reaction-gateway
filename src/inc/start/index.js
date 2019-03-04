const util = require('./../util');
const chalk = require('chalk');

module.exports = function ( config ) {

  // Output the software names and versions...
  console.log(`${config.reactor.server.name} v${config.reactor.server.version}`,
    `running ${config.reactor.app.name} v${config.reactor.app.version}`);
  
  const debug = require('debug')('acter:start');
  debug('Booting...');
  const {app, express, socketio, memory, authentication} = require('./server')(config);
  
  // Make config available to services via context.app.get('config')
  app.set('config', config);
  debug('Server loaded.');

  // Load the main persistence connection...
  const data = require('./persistence')(config.reactor.server.persistence);
  debug('Persistence loaded.');

  // Log any aspects present...
  let aspects = ['before', 'after', 'error'];
  let aspectsFound = [];
  aspects.forEach(aspect => {
    let aspectPath = util.resolve(util.root() + `/src/aspects/${aspect}.js`);
    if (util.exists(aspectPath)) {
      aspectsFound.push(aspect);
    } 
  });
  if (aspectsFound.length) {
    console.log(`Found ${aspectsFound.length} aspect(s):`, aspectsFound);
  } else {
    console.log('No aspects present');
  }
  
  // See if we're hosting statics...
  if (config.reactor.server.statics.host === true) {
    const statics = config.reactor.server.statics
    const folder = util.resolve(statics.folder)
    console.log(`Hosting static files at ${statics.endpoint} from ${folder}`)
    app.use(statics.endpoint, express.static(folder))
  }

  // Load the service loader...
  const loadService = require('./service')(config, app, data);
  var services = {};
  debug('loading services');

  // Setup each enabled service...
  let definitions = config.reactor.services.definitions;
  let definedUsers = false;
  Object.keys(definitions).forEach(name => {
    let service = definitions[name];
    debug('Loading service', name);
    services[name] = loadService(name, service);
    if (name === 'users') definedUsers = true;
  });
  debug('Services loaded.');

  // See if users have been defined...
  if (!definedUsers) {
    console.log('No users service has been defined, creating one in memory');
    app.use('/users', memory());
  }
  // Now load the authentication service...
  app.configure(authentication.auth({ secret: config.reactor.secrets.auth }))
    .configure(authentication.local())
    .configure(authentication.jwt());

  app.use(express.errorHandler());

  const ports = { from: 0, to: 0 };

  // Log that we're about to start listening...
  if (Number.isInteger(config.reactor.server.port)) {
    debug('Trying port', config.reactor.server.port);
    ports.from = config.reactor.server.port;
    ports.to = config.reactor.server.port;

  } else {
    ports.from = config.reactor.server.port.from;
    ports.to = config.reactor.server.port.to;
    debug(`Finding free port between ${ports.from} and ${ports.to}`);
  }

  // Start listening...
  const portfinder = require('portfinder');
  portfinder.getPort({
    port: ports.from,
    stopPort: ports.to
  }, (err, port) => {
    if (err) {
      console.log('Unable to get a free port.  Please change your settings.');
      console.log('https://github.com/onexdata/reaction-gateway#config-options');
      console.log('Your current port settings are:', config.reactor.server.port);
      process.exit(-1);
    }
    debug('About to listen');
    app.listen(port);
    console.log(`Listening on ${port}`);
  });

  return {app, services};
};
