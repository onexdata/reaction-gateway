const util = require('./../util');
const chalk = require('chalk');

module.exports = function ( config ) {

  // Output the software names and versions...
  console.log(`${config.reactor.server.name} v${config.reactor.server.version}`,
    `running ${config.reactor.app.name} v${config.reactor.app.version}`);
  
  const debug = require('debug')('acter:start');
  debug('Booting...');

  // bootstrap the server...
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
    console.log('Users must be defined. Creating them.');
    loadService('users', { model: 'users', auto: true } );
    //app.use('users', memory());
  }

  app.service('users').hooks({
    // Make sure `password` never gets sent to the client
    after: authentication.local.hooks.protect('password')
  });
   
  // Now load the authentication service...
  app.configure(authentication.auth({ secret: config.reactor.secrets.auth }))
    .configure(authentication.local())
    .configure(authentication.jwt());

  // Setup a hook to only allow valid JWTs or successful 
  // local auth to authenticate and get new JWT access tokens
  app.service('authentication').hooks({
    before: {
      create: [
        // You can chain multiple strategies
        authentication.auth.hooks.authenticate(['jwt', 'local'])
      ],
      remove: [
        authentication.auth.hooks.authenticate('jwt')
      ]
    },
    after: {
      create: [
        (context) => {
          context.result.user = context.params.user;
          delete context.result.user.password;
        }
      ]
    }
  });

  app.service('users').hooks({
    before: {
      create: [
        authentication.local.hooks.hashPassword({ passwordField: 'password' })
      ]
    }
  });

  //app.service('users').create({email: 'frank@test.com', password: '123'});

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
