const chalk = require('chalk');
const { green, red } = chalk;
function log(msg) {
  console.log(green(msg));
}
function log1(msg) {
  console.log(red(msg));
}

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
    // 插件之前 运行
    pre(state) {
      this.cache = new Map();
    },
    visitor: {
      Identifier(path, state) {
        if (path.node.name == 'bqc') {
          path.node.name = 'bqcwq';
        }
      },
      BinaryExpression(path, state) {
        this.cache.set(path.node.operator, 1);
        console.log(path.node.operator);
        if (path.node.operator !== '*') return;
        // 获取插件配置选项
        console.log(state.opts);
      },
      // 抛出一个语法错误
      // StringLiteral(path) {
      //   throw path.buildCodeFrameError('Error message here');
      // },
    },
    // 插件之后 运行
    post(state) {
      console.log(this.cache);
    },
  };
};
