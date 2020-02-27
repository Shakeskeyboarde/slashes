/* istanbul ignore file */
import repl from 'repl';

import * as slashes from './';

const context = { slashes, ...slashes };

console.log();
console.log('The library API has been added to the REPL context:');
Object.keys(context).forEach(key => console.log(`  ${key}`));
console.log();

const r = repl.start();

Object.assign(r.context, context);
