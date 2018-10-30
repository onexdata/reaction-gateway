process.env.DEBUG = 'reactor:*';

console.log(`
 __   ___       __  ___  __   __
|__) |__   /\\  /  '  |  /  \\ |__)
|  \\ |___ /~~\\ \\__,  |  \\__/ |  \\
`);
process.env['NODE_CONFIG'] = JSON.stringify( { server: { build: 9 } } );
const config = require('config');
const app = require('./inc/start')( config );
