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
const util = require('./../util');

module.exports = (config, app, persistence) => {
  // Extract the data sources from the passed persistence object...
  const {DB, db, defaultService} = persistence;

  // Return a function that takes a name and a service definition, returns a model (if any)...
  return (serviceName, service) => {
    let Model = {};
    if (service.options === undefined) service.options = {};
    if (!service.disabled) {

      // Find the paths for model and service, and name the soruce...
      let sourcePaths = [__dirname + './../../../', util.root()]
      let sourceNames = ['reactor source', 'app source', 'auto-generated']
      let build = {
        // Will contain { path, source }
        model: service.model ? util.anyExists(sourcePaths, sourceNames, `/src/models/${service.model}.js`) : { path: false, source: sourceNames[2]},
        service: !service.auto ? util.anyExists(sourcePaths, sourceNames, `/src/services/${serviceName}`) : { path: false, source: sourceNames[2]}
      }

      // Log that we're mounting a service...
      console.log(`Mounting /${serviceName} (${build.service.source})`,
      `${service.model && build.model.path ?
      `using ${service.model} model (${build.model.source})` : '' }`)

      // If we're supposed to associate a model with it...
      if (service.model) {
        if (!build.model.path) {
          throw new Error(`The service ${serviceName} uses model ${service.model} but the source for that model doesn't exist.`);
        } 
        build.model.module = require(build.model.path)(DB);
        build.model.defaults = Object.create(service.options.model || config.reactor.services.defaults.model); 

        Model = db.define(service.model, build.model.module, build.model.defaults);
        debug(`Model ${service.model} sucessfully built`);
      }
      
      // Allow the service to automatically generate persistence interactions...
      if (service.auto) {
        app.use(serviceName, defaultService({
          Model: Model,
          paginate: service.options.pagination || config.reactor.services.defaults.pagination
        }));
      } else {
        // If we're not automatically generating the service, call it to generate itself...
        try {
          build.service.module = require(build.service.path)( config, config.reactor.services.definitions[serviceName].config, defaultService )
          app.use(serviceName, build.service.module);
        } catch (e) {
          console.log(`There was an error when trying to load /${serviceName}`, e)
        }
      }

      // Attach additional hooks if aspects exist...
      let hooks = {}
      let aspects = ['before', 'after', 'error']
      aspects.forEach(aspect => {
        let path = util.resolve(util.root() + `/src/aspects/${aspect}.js`)
        if (util.exists(path)) hooks[aspect] = require(path)
      });
      app.service(serviceName).hooks(hooks);
    }
    return Model;
  };
};