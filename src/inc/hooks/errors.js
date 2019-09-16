const debug = require('debug')('acter:error');
module.exports = (context) => {
  debug(`${context.method} ${context.path}. Arguments:`, context.arguments, context.error);
  return context;
};
