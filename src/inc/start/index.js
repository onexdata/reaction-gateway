
module.exports = function ( config ) {
  console.log(`Reactor v${config.server.version} ${config.server.build}`);
  const debug = require('debug')('reactor:start');
  debug('Booting...');
  const {app, express, socketio} = require('./server')(config);
  // Make config available to services via context.app.get('config')
  app.set('config', config);
  debug('Server loaded.');

  // Load the main persistence connection...
  const data = require('./persistence')(config.server.persistence);
  debug('Persistence loaded.');

  // Load the logging output 
  const loadService = require('./service')(config, app, data);
  var services = {};

  // Setup each enabled service...
  let definitions = config.services.definitions;
  Object.keys(definitions).forEach(name => {
    let service = definitions[name];
    services[name] = loadService(name, service);
  });
  debug('Services loaded.');

  app.use(express.errorHandler());
  app.listen(config.server.port);
  console.log(`Listening on ${config.server.port}`);
  return {app, services};
};
