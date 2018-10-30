/**
 * 
 * Creates a service instance from config, using the app artifact, attaches hooks and automation using persistence.
 * 
 * @param {*} config - The application config.
 * @param {*} app - The application artifact; the engine that powers the framework.
 * @param {*} persistence - The persistance artifact; the engine that accepts multiple datasources and generates interfaces.
 * 
 */
const debug = require('debug')('reactor:start:initService');

module.exports = (config, app, persistence) => {
  const {DB, db, defaultService} = persistence;
  return (serviceName, service) => {
    let Model = {};
    if (service.options === undefined) service.options = {};
    if (!service.disabled) {
      debug(serviceName);
      // If a resource is defined, load it...
      let name = service.model;
      if (name) {
        debug(`${serviceName} is using the ${name} model`);
        // Get the resource from the file...
        let model = require('../../models/' + name)(DB);
        // Define the resource...
        const modelDefaults = Object.create(service.options.model || config.services.defaults.model);
        Model = db.define(name, model, modelDefaults);
        // When it's defined and up and running...

      }
      
      // Allow the service to automatically generate persistence interactions...
      if (service.auto) {
        app.use(serviceName, defaultService({
          Model: Model,
          paginate: service.options.pagination || config.services.defaults.pagination
        }));
      } else {
        // If we're not automatically generating the service, call it to generate itself...
        app.use(serviceName, require('../../services/' + serviceName)( config, config.services.definitions[serviceName].config, defaultService ));  
      }

      // Attach additional hooks...
      app.service(serviceName).hooks({
        before: {
          all: require('../aspects/before')
        },
        after: {
          all: require('../aspects/after')
        },
        // Error handler...
        error: require('../aspects/errors')
      });
    }
    return Model;
  };
};