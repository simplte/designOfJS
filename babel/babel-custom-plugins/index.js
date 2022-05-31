const { parse, traverse, transformFromAstSync } = require('@babel/core');
const generate = require('@babel/generator').default;
const fs = require('fs');
const path = require('path');
// Babel Types模块是一个用于 AST 节点的 Lodash 式工具库
// 它包含了构造、验证以及变换 AST 节点的方法。 该工具库包含考虑周到的工具方法，对编写处理AST逻辑非常有用
// const t = require('babel-types');
// 插件
// const minePlugin = require('./customPlugins/plugin.js');
// const minePlugin1 = require('./customPlugins/useful-babel-tools.js');
// const minePlugin2 = require('./customPlugins/cutom-plugins1.js');
const minePlugin2 = require('./customPlugins/cutom-plugins2.js');
// 需处理文件
// const source = fs.readFileSync(path.join(__dirname, './source/source.js'), 'utf8');
// const source1 = fs.readFileSync(path.join(__dirname, './source/source-plugin1.js'), 'utf8');
const source1 = fs.readFileSync(path.join(__dirname, './source/source-plugin2.js'), 'utf8');
// 转ast
const ast = parse(source1);

const { code } = transformFromAstSync(ast, source1, {
  plugins: [
    [
      minePlugin2,
      {
        // named default namespaced
        // log: {
        //   kind: 'named',
        //   require: 'track',
        //   identifierName: 'log',
        // },
        // noRequire: {
        //   kind: 'named',
        // },
        // testCode: "alert('插入代码测试')",
      },
    ],
  ],
});

fs.writeFileSync(path.join(__dirname, './outPut/generate.js'), code);
// console.log(code);
