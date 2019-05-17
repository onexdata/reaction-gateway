/**
 * 
 * Produces the basic functionality of the server, including the feathers app, express and socket artifacts.
 * 
 * @param {*} config - The application config
 * 
 */
module.exports = (config) => {
  const debug = require('debug')('acter:start:initServer');
  debug('Requiring core libraries.');
  const feathers = require('@feathersjs/feathers');
  const express = require('@feathersjs/express');
  const socketio = require('@feathersjs/socketio');
  const auth = require('@feathersjs/authentication');
  const local = require('@feathersjs/authentication-local');
  const jwt = require('@feathersjs/authentication-jwt');
  const memory = require('feathers-memory');
  let server = null;
  debug('Setting up Express.');

  // Create an Express compatible Feathers application instance.
  const app = express(feathers());

  // Allow HTTPS...
  if (config.reactor.server.mode === 'https') {
    console.log('HTTPS mode')
    const protocol = require('https');
    if (config.reactor.server.key && config.reactor.server.cert) {
      const fs = require('fs')
      server = protocol.createServer({
        key: fs.readFileSync(config.reactor.server.key),
        cert: fs.readFileSync(config.reactor.server.cert)    
      }, app)  
    } else {
      console.log('You are trying to run in HTTPS mode without a privateKey and certificate! That will not work. Check your settings...\n', config)
      process.exit()
    }
  } else {
    console.log('HTTP mode')
    const protocol = require('http');
    server = protocol.createServer({}, app)
  }

  // Enable REST services
  const fs = require('fs')
  app.configure(express.rest())
    // Enable Socket.io services
    .configure(socketio())
    // Turn on JSON parser for REST services
    .use(express.json())
    // Turn on URL-encoded parser for REST services
    .use(express.urlencoded({ extended: true }));
  debug('Complete.');

  return {server, app, express, socketio, memory, authentication: { auth, local, jwt } };
};
