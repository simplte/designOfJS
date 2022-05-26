const chalk = require('chalk');
const { green } = chalk;
// Babylon 是 Babel 的解析器
const babylon = require('babylon');
// 遍历模块维护了整棵树的状态，并且负责替换、移除和添加节点
const traverse = require('babel-traverse').default;
// Babel Types模块是一个用于 AST 节点的 Lodash 式工具库
// 它包含了构造、验证以及变换 AST 节点的方法。 该工具库包含考虑周到的工具方法，对编写处理AST逻辑非常有用
const t = require('babel-types');
// Babel Generator模块是 Babel 的代码生成器，它读取AST并将其转换为代码和源码映射（sourcemaps）。
const generate = require('babel-generator').default;
/**
 * babel-template 是另一个虽然很小但却非常有用的模块。
 * 它能让你编写字符串形式且带有占位符的代码来代替手动编码，
 * 尤其是生成的大规模 AST的时候。
 *  在计算机科学中，这种能力被称为准引用（quasiquotes）。
 */
const template = require('babel-template');
function log(msg) {
  console.log(green(msg));
}

const code = `function square(n) {
  return n * n
}`;

const ast = babylon.parse(code);
traverse(ast, {
  enter(path) {
    // if (path.node.type === 'Identifier' && path.node.name === 'n') {
    //   path.node.name = 'x';
    // }
    if (t.isIdentifier(path.node, { name: 'n' })) {
      path.node.name = 'x';
    }
  },
});
const result = generate(ast, {}, code);
log('-------------');
console.log(result);
// {
//     code: 'function square(x) {\n  return x * x;\n}',
//     map: null,
//     rawMappings: null
//   }
const buildRequire = template(`
  var IMPORT_NAME = require(SOURCE);
`);

const ast1 = buildRequire({
  IMPORT_NAME: t.identifier('myModule'),
  SOURCE: t.stringLiteral('my-module'),
});

console.log(generate(ast1).code);
// var myModule = require("my-module");

/**
 * 总结：
 * 1：babylon  个人理解和 @babel/core其中parse的作用一致，将脚本内容字符串转换为ast
 * 2：babel-traverse 一句话总结：遍历ast节点树，并在各个钩子中对节点进行增删改
 * 3：babel-types  类似于lodash的工具方法库，简化对于path等相关节点信息的判断
 * 4：babel-generator 将ast转换为代码code和源码映射
 * 5：babel-template 模板替换 暂时不知道哪种场景下可以用到
 * @returns
 */

// --------------------------------------------
// 本脚本忽略以下内容，单纯为了能够运行上面代码
module.exports = () => {
  return {
    visitor: {},
  };
};
