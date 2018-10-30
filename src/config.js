const util = require('./inc/util')
module.exports = {
  // Your application defaults...
  app: {
    name: util.pjson().name,
    version: util.pjson().version,
  },
  server: {
    // You can over-ride this if you want to hide which gateway you're running.
    name: 'Reactor',
    // You can over-ride this if you want to as well.
    version: '1.0.0',
    // By default, will try port 8000 and use the next available, override here.
    port: { from: 8000, to: 8999 },
    // You can override the logo as well. Use a string or a script that exports a string.
    logo: require('./inc/logo'),
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
      }
    },
    definitions: {
      status: {
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
}