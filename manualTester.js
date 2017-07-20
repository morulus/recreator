const fs = require('fs');
const path = require('path');

const babelcfg = JSON.parse(fs.readFileSync('./.babelrc'));
babelcfg.plugins.push([
  'transform-es2015-modules-commonjs',
  { loose: true },
]);
require('babel-register')(babelcfg);
setTimeout(() => {
  require(path.join(process.cwd(), '__manual__', `${process.argv[2]}.js`));
});
