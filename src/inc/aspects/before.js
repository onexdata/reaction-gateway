const debug = require('debug')('acter:services:requests');

var dataLog = function (args) {
  //console.log('dataLog:', args);
};

debug.log = dataLog.bind(dataLog);

module.exports = (context) => {
//  debug(`${context.method} ${context.path} Arguments:`, context.arguments)
  debug('demo');
  //console.log(context.app.get('config'));
  
  context.reactor = { reaction: 'this is reactor'};
  // console.log(context)
  return context;
};
