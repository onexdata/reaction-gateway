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
  debug('Setting up Express.');

  // Create an Express compatible Feathers application instance.
  const app = express(feathers());

  // Enable REST services
  app.configure(express.rest())
    // Enable Socket.io services
    .configure(socketio())
    // Turn on JSON parser for REST services
    .use(express.json())
    // Turn on URL-encoded parser for REST services
    .use(express.urlencoded({ extended: true }));
  debug('Complete.');

  return {app, express, socketio, memory, authentication: { auth, local, jwt } };
};
