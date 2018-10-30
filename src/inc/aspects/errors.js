const debug = require('debug')('reactor:error');
module.exports = (context) => {
  debug(`${context.method} ${context.path}. Arguments:`, context.arguments, context.error);
  return context;
};
