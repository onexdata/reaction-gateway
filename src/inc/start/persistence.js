/**
 * 
 * Creates a persistence engine from a connection URL.
 * The URL takes the format of protocol://user:pass@host:port/database.
 * 
 * @param {*} connectionURL - The URL to connect to the persistence layer.  This is the only config needed for persistence.
 * 
 */
/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
module.exports = (connectionURL) => {
  const path = require('path');

  // Prepopulate the persistence layer with demo data if asking for a demo...
  if (connectionURL === 'demo') {
    connectionURL = 'sqlite://localhost/node_modules/reaction-gateway/demo.sqlite';
  }

  const debug = require('debug')('acter:start:initPersistence');
  const {URL} = require('url');
  const ds = new URL(connectionURL);
  let protocol = ds.protocol.slice(0, -1);
  let dbName = ds.pathname.slice(1);
  let options = {
    dialect: protocol,
    host: ds.host,
    logging: false,
    operatorsAliases: false
  };
  debug(`Attempting ${protocol} on ${ds.host}/${dbName}`);
  switch (protocol) {
  // Handle default sequelize supported protocols...
  case 'sqlite':
    options.storage = './' + ds.pathname.slice(1);
  case 'postgresql':
  case 'mssql':
  case 'mysql':
  case 'mariadb':
    const DB = require('sequelize');
    const db = new DB(dbName, ds.username, ds.password, options);
    debug('Complete.');
    console.log(`Datasource is ${protocol} on ${ds.host}/${dbName}`);
    return { DB, db, defaultService: require('feathers-sequelize') };
  default:
    throw new Error(`The database protocol ${protocol} is not supported. Is there an error in what you typed? (${connectionURL})`);
  }
};