const babel = require('babel-core');
const fs = require('fs');
const path = require('path');
const testFilePath = path.join(__dirname, '../src/index.js');
console.log(testFilePath);
const testCode = fs.readFileSync(testFilePath, 'utf8');
console.log(testCode);
// const { code, map, ast } = babel.transform('() => { console.log(123) } ');
// const { code, map, ast } = babel.transform(testCode);
const customPlugin = require('../plugins/index.js');

const { code, map, ast } = babel.transformFileSync(testFilePath, {
  plugins: customPlugin,
  generatorOpts: {
    quotes: 'double',
  },
});

console.log(code);
