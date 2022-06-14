const chalk = require('chalk');
const { green, red } = chalk;
function log(msg) {
  console.log(green(msg));
}
function log1(msg) {
  console.log(red(msg));
}
const process = {
  env: {
    NODE_ENV: 'development',
  },
};
/**
 * 总结：
 * 1：babylon  个人理解和 @babel/core其中parse的作用一致，将脚本内容字符串转换为ast
 * 2：babel-traverse 一句话总结：遍历ast节点树，并在各个钩子中对节点进行增删改
 * 3：babel-types  类似于lodash的工具方法库，简化对于path等相关节点信息的判断
 * 4：babel-generator 将ast转换为代码code和源码映射
 * 5：babel-template 模板替换 暂时不知道哪种场景下可以用到
 * @returns
 */

/**
 * 简单的实现变量名称转换操作的插件
 * @param {*} param0
 * @returns
 */
// 这个抛出的函数入参实际上是babel  结构可以拿到type类型
module.exports = ({ types: t }) => {
  return {
    visitor: {
      // VariableDeclaration(path, state) {
      //   log(path.inList); // true
      //   log(path.listKey); // "body"
      //   log(path.key); // 0
      //   log(path.getSibling(0)); // pathA
      //   log(path.getSibling(path.key + 1)); // pathB
      //   log(path.container); // [pathA, pathB, pathC]
      // },
      BinaryExpression(path) {
        if (path.node.operator !== '*') return;
        console.log(path.replaceWith);
        // 处理 1： 替换一个节点
        path.replaceWith(t.binaryExpression('==', path.node.left, t.NumericLiteral(2)));
      },
      MemberExpression(path, state) {
        // path.get("object") 获取到的就是 object(process.env)对应的 path实例。
        // path.get("object").matchesPattern("process.env") 检查 object 是否符合 "process.env" 这种模式
        if (path.get('object').matchesPattern('process.env')) {
          // path.toComputedKey() 获取成员表达式的键(key)
          const key = path.toComputedKey();
          console.log(key);
          if (t.isStringLiteral(key)) {
            path.replaceWith(t.valueToNode(process.env[key.value]));
          }
        }
      },
      Identifier(path, state) {
        log1(path.node.name);
      },
      // 处理 2： 用多节点替换单节点
      ReturnStatement(path) {
        path.replaceWithMultiple([
          t.expressionStatement(t.stringLiteral('Is this the real life?')),
          t.expressionStatement(t.stringLiteral('Is this just fantasy?')),
          t.expressionStatement(t.stringLiteral('(Enjoy singing the rest of the song in your head)')),
        ]);
      },
      FunctionDeclaration(path, state) {
        //  用字符串源码替换节点
        // path.replaceWithSourceString(function add(a, b) {
        //   return a + b;
        // });
        // 插入兄弟节点
        path.insertBefore(t.expressionStatement(t.stringLiteral("Because I'm easy come, easy go.")));
        path.insertAfter(t.expressionStatement(t.stringLiteral('A little high, little low.')));
      },
    },
  };
};
