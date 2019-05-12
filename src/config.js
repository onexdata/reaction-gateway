const util = require('./inc/util');
module.exports = {
  // Your application defaults...
  app: {
    name: util.pjson().name,
    version: util.pjson().version,
  },
  secrets: {
    auth: {
      secret: 'changeThis!'
    }
  },
  server: {
    // You can watch the internals
    debug: 'acter:*',
    // You can over-ride this if you want to hide which gateway you're running.
    name: 'Acter',
    // You can over-ride this if you want to as well.
    version: util.pjson(true).version,
    // By default, will try port 8000 and use the next available, override here.
    port: { from: 3001, to: 9999 },
    // You can override the logo as well. Use a string or a script that exports a string.
    branding: {
      logo: require('./inc/logo'),
      color: 'yellow'
    },
    // Whether or not to host static files and where...
    statics: {
      active: false,
      folder: 'statics',
      endpoint: '/remote'
    },
    // If a folder should be watched, send it to report...
    watch: {
      active: false
    },
    // Where the data from services comes from.
    persistence: 'demo'
  },
  services: {
    defaults: {
      model: {
        freezeTableName: true
      },
      pagination: {
        default: 20,
        max: 1000
      },
      base: {
        // The base.folder can let you host things like /src/legacy-services/v1 etc.
        // Note that /services/ will check /services (root of your project) OR /src/services/
        folder: '/src/services/',
        // The base.endpoint can let you prepend your service with things like /api/v2/ etc.
        mount: '/'
      }
    },
    definitions: {
      status: {
        base: {
          // This is where you would redefine the base mount point for an individual service...
          mount: '/',
          // This is where you would redefine the base folder for an individual service...
          // Note that /services/ will check /services (root of your project) OR /src/services/
          folder: '/src/services/'
        },
        config: {
          show: {
            // WARNING: Showing environment variables can be a security risk.
            env: false,
            // WARNING: Showing persistence can be a security risk.
            persistence: false,
            // WARNING: Showing net details can be a security risk.
            net: false,
            disk: false,
            errors: false,
            build: false,
            config: false,
            environment: false,
            debug: false,
            mode: false,
            history: true,
            os: true,
            cpu: true,
            app: true,
            gateway: true,
            systemMemory: true,
            systemUptime: true,
            processMemory: true,
            processUptime: true,
          },
          history: {
            // Interval in ms to poll status history.
            interval: 1000,
            // Number of history snapshots to store.
            count: 60
          },
          // How long to cache disk statistics in seconds (a query can take a second or longer).
          diskCache: 60
        }
      }
    }
  }
};
