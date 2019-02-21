const {disk, stats} = require('../../inc/initStats');
const errorHistory = require('../../inc/initErrorTracking');
const debug = require('debug')('acter:service:status');
const os = require('os');
var diskCache = false;

module.exports = function ( appConfig, config = {show:{}}, persistence ) {
  return {
    async find(params) {
      let status = {
        system: {
        },
        process: {
        },
      };
      
      // Add optional status items...

      // Build
      if (config.show.build) status.process.build = process.env.BUILD_NO || 'n/a';
      // Environment
      if (config.show.environment) status.process.build = process.env.NODE_ENV || 'n/a';
      // Debug
      if (config.show.debug) status.process.debug = process.env.DEBUG || 'n/a';
      // Mode
      if (config.show.mode) status.process.mode = 'n/a';
      // App details
      if (config.show.app) status.process.app = appConfig.reactor.app;
      // server details
      if (config.show.gateway) status.process.gateway = {
        name: appConfig.reactor.server.name,
        version: appConfig.reactor.server.version,
      }
      // Config
      if (config.show.config) status.process.config = appConfig;
      // Errors
      if (config.show.errors) status.errors = errorHistory.get();

      // History
      if (config.show.history) status.history = stats;
      
      // Network
      if (config.show.net) status.system.net = os.networkInterfaces();

      // Uptime
      if (config.show.systemUptime) status.system.up = os.uptime().toFixed(0);
      if (config.show.processUptime) status.process.up = process.uptime().toFixed(0);

      // Memory
      if (config.show.systemMemory) {
        status.system.memory = {
          total: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + 'GB',
          used: ((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2) + 'GB',
          free: (os.freemem() / 1024 / 1024 / 1024).toFixed(2) + 'GB',
          percentUsed: 100 - ((os.freemem() / os.totalmem() ) * 100).toFixed(2) + '%'
        };
      }
      if (config.show.processMemory) {
        status.process.memory = {
          used: (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + 'MB',
          percentUsed: ((process.memoryUsage().rss / os.totalmem()) * 100).toFixed(2) + '%'
        };
      }

      // OS
      if (config.show.os) status.system.os = `${os.type()} ${os.release()} (${os.platform()}/${os.arch()})`;
      
      // Environment variables
      if (config.show.env) status.system.env = process.env;

      // CPU
      if (config.show.os) {
        status.system.cpu = os.cpus()[0].model;
        status.system.cores = os.cpus().length;
      }

      // Disk
      if (config.show.disk) {
        if (!diskCache) diskCache = await disk(); // Only happens the first time it's checked.

        // Check if the cache is expired, if so, get a fresh copy...
        let d = new Date();
        if (diskCache.age.getTime() + (config.diskCache * 1000) < d.getTime() ) {
          diskCache = await disk();
          debug('Disk cache refreshed');
        }
        status.system.disk = diskCache;
      }


      return status;
    },
    // Return specific status about the server...
    async get(id, params, context) {
      switch (id) {
      case 'config':
        return appConfig;
      case 'error':
        throw new Error('status/error triggered.');
      }
    },
    async create(data, params) {

    },
    async update(id, data, params) {

    },
    async patch(id, data, params) {

    },
    async remove(id, params) {

    },
    setup(app, path) {
      // console.log('Setup:', app)
    }
  };
};