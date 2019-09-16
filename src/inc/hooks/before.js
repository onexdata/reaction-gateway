const debug = require('debug')('acter:services:requests');

module.exports = (context) => {
  debug(`${context.method} ${context.path} Arguments:`, context.arguments);
  context.acter = { reaction: 'this is acter'};
  return context;
};
