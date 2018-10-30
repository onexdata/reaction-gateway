/**
 * 
 * Produces the basic functionality of the server, including the feathers app, express and socket artifacts.
 * 
 * @param {*} config - The application config
 * 
 */
module.exports = (config) => {
  const debug = require('debug')('reactor:start:initServer');
  debug('Requiring core libraries.');
  const feathers = require('@feathersjs/feathers');
  const express = require('@feathersjs/express');
  const socketio = require('@feathersjs/socketio');
  debug('Setting up Express.');

  // Create an Express compatible Feathers application instance.
  const app = express(feathers());

  // Turn on JSON parser for REST services
  app.use(express.json());
  // Turn on URL-encoded parser for REST services
  app.use(express.urlencoded({ extended: true }));
  // Enable REST services
  app.configure(express.rest());
  // Enable Socket.io services
  app.configure(socketio());
  debug('Complete.');

  return {app, express, socketio};
};
