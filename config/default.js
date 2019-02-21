/**
 * 
 * This is the application layer in layered config.
 * 
 * This file stores 100% of default configuration.  JavaScript was chosen over JSON because of comments, and pragmatic initial assignment.
 * For example, the copyright date, build number or other default configuration items may need to be determined at build-time.
 * 
 * To defer config till it's first queried, return the defer function below...
 * 
 */
var defer = require('config/defer').deferConfig;
module.exports = {
  secrets: {
    auth: {
      secret: 'changeThis!'
    }
  },
  server: {
    debug: '',
    port: 3030,
    version: '0.1.1',
    /* Configuration can be built at runtime.  Deferred functions cannot be replaced.  Deferred functions cannot alter anything (must be immutable). */
    build : defer(function ()  {
      return this.server.version + ' ' + Math.random();
    }),
    logs: {
      persistence: 'mysql://root:Makeitso1@localhost/logs'
    },
    errors: {
      persistence: 'mysql://root:Makeitso1@localhost/errors'
    },
    // persistence: 'sqlite://user:pass@localhost/admin.sqlite'
    persistence: 'mysql://root:Makeitso1@localhost/admin' // protocol://user:pass@host:port/dbName
  },
  services: {
    defaults: {
      model: {
        freezeTableName: true
      },
      pagination: {
        default: 20,
        max: 1000
      }
    },
    definitions: {
      alerts: {},
      patients: {},
      tasks: {},
      messages: { model: 'message', auto: true },  
      status: {
        config: {
          show: {
            env: false, // WARNING: Showing all environment variables can be a security risk if devOps stores secrets here.
            persistence: true, // WARNING: Showing persistence can be a security risk because it contains the password to connect.
            net: false,
            disk: false,
            os: false,
            cpu: false,
            errors: false,
            build: false,
            version: true,
            config: true,
            environment: false,
            debug: false,
            mode: false,
            containerMemory: false,
            containerUptime: false,
            processMemory: false,
            processUptime: false,
            history: false,
          },
          history: {
            interval: 1000, // Interval in ms to poll status history.
            count: 60 // Number of history snapshots to store.
          },
          diskCache: 60 // How long to cache disk statistics in seconds (a query can take a second or longer).
        }
      }
    }
  }
}