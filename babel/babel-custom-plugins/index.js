const { parse, traverse, transformFromAstSync } = require('@babel/core');
const generate = require('@babel/generator').default;
const fs = require('fs');
const path = require('path');
const minePlugin = require('./plugin.js');
const source = fs.readFileSync(path.join(__dirname, './source.js'), 'utf8');
const ast = parse(source);
console.log(source);

const { code } = transformFromAstSync(ast, source, {
  plugins: [
    [
      minePlugin,
      {
        // named default namespaced
        log: {
          kind: 'named',
          require: 'track',
          identifierName: 'log',
        },
        noRequire: {
          kind: 'named',
        },
        testCode: "alert('插入代码测试')",
      },
    ],
  ],
});

fs.writeFileSync(path.join(__dirname, './generate.js'), code);
console.log(code);
