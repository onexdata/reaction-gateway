/**
 * 
 * Creates a service instance from config, using the app artifact, attaches hooks and automation using persistence.
 * 
 * @param {*} config - The application config.
 * @param {*} app - The application artifact; the engine that powers the framework.
 * @param {*} persistence - The persistance artifact; the engine that accepts multiple datasources and generates interfaces.
 * 
 */
const debug = require('debug')('acter:start:initService');
const chalk = require('chalk');
const util = require('./../util');

module.exports = (config, app, persistence) => {

  // Extract the data sources from the passed persistence object...
  const {DB, db, defaultService} = persistence;

  // Return a function that takes a name and a service definition, returns a model (if any)...
  return (serviceName, service) => {
    let modelBasePath = '/src/models/';
    let serviceBasePath = config.reactor.services.defaults.base.folder;
    let Model = {};
    if (service.options === undefined) service.options = {};
    if (!service.disabled) {

      // If the service has a base folder, set it, otherwise keep the default...
      serviceBasePath = (service.base && service.base.folder) ? service.base.folder : serviceBasePath;

      // Find the paths for model and service, and name the soruce...
      let sourcePaths = [__dirname + './../../../', util.root()];
      let sourceNames = ['reactor source', 'app source', 'auto-generated'];
      let build = {
        // Will contain { path, source }
        model: service.model ?
          util.anyExists(sourcePaths, sourceNames, `${modelBasePath}${service.model}.js`) :
          { path: false, source: sourceNames[2]},
        service: !service.auto ?
          util.anyExists(sourcePaths, sourceNames, `${serviceBasePath}${serviceName}`) :
          { path: false, source: sourceNames[2]}
      };

      // Set the base endpoint for the service...
      build.service.endpointBase = config.reactor.services.defaults.base.mount;
      build.service.endpointBase = (service.base && service.base.mount) ? service.base.mount : build.service.endpointBase;
      build.service.mount = build.service.endpointBase + serviceName;
      
      // Remove all leading forward slash if it exists...
      build.service.mount = util.removePreceeding(build.service.mount, '/');

      // Log that we're mounting a service...
      console.log(
        `Mounting /${build.service.mount} (`+ chalk.green(build.service.source) + ')',
        `${service.model && build.model.path ?
          `using ${service.model} model (${build.model.source})` : '' }`);

      // If we're supposed to associate a model with it...
      if (service.model) {
        if (!build.model.path) {
          throw new Error(`\nThe service ${serviceName} uses model ${service.model} but the source for that model doesn't exist.\n\n`);
        } 
        build.model.module = require(build.model.path)(DB);
        build.model.defaults = Object.create(service.options.model || config.reactor.services.defaults.model); 

        Model = db.define(service.model, build.model.module, build.model.defaults);
        debug(`Model ${service.model} sucessfully built`);
      }
      
      // Allow the service to automatically generate persistence interactions...
      if (service.auto) {
        app.use(build.service.mount, defaultService({
          Model: Model,
          paginate: service.options.pagination || config.reactor.services.defaults.pagination
        }));
      } else {
        // If we're not automatically generating the service, call it to generate itself...
        if (!build.service.path) {
          console.log(chalk.red(
            '\nERROR: The folder path for this service does not exist.\n' +
            'Check the path and fix it in order to mount the service: ' +
            `"${util.root()}${serviceBasePath}${serviceName}"`
          ));
        } else {
          try {
            build.service.module = require(build.service.path)(
              config,
              config.reactor.services.definitions[serviceName].config,
              defaultService
            );
            app.use(build.service.mount, build.service.module);
          } catch (e) {
            console.log(chalk.red(
              `\nERROR: There was an error when trying to load /${build.service.mount}.\n`,
              e));
          }
        }
      }

      // Attach additional hooks if aspects exist...
      let hooks = {};
      let aspects = ['before', 'after', 'error'];
      aspects.forEach(aspect => {
        let path = util.resolve(`src/aspects/${aspect}.js`);
        if (util.exists(path)) hooks[aspect] = require(path);
      });
      
      // Try to add hooks to the built service...
      try {
        app.service(build.service.mount).hooks(hooks);
      } catch (e) {
        console.log(chalk.red(
          `\nERROR: The service /${build.service.mount} was not mounted. This is ` +
          'usually because the folder path or name is not what you expected.\n'
        ));
      }
    }
    return Model;
  };
};