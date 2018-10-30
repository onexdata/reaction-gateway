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
      messages: { model: 'message', auto: true },  
    }
  }
}