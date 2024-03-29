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
    visitor: {
      Identifier(path, state) {
        // 6.检查标识符 identifier 是否被引用
        if (path.isReferencedIdentifier()) {
          log1('被引用');
        } else {
          log('没有被引用');
          log(JSON.stringify(path.node));
        }
        // 6.1 或者
        if (!path.isReferenced(path.node, path.parent)) {
          log('没有被引用1');
          log1(JSON.stringify(path.parent));
        }
      },
      Literal(path, state) {
        console.log(JSON.stringify(path.node.value));
      },
      BinaryExpression(path, state) {
        // 1.path.node.property 下面有 left right operator  分别能渠道  运算符左侧 运算符右侧  和运算符的具体内容
        if (path.node.operator !== '===') return;
        // 2.访问path内部的值 path.get('left)
        // console.log(path.get('left'));
        path.node.left = t.identifier('bqc2');
        path.node.right = t.identifier('wq2');
        // 3.检查节点类型
        if (t.isIdentifier(path.node.left)) {
          log1(JSON.stringify(path.node.left.name));
        }
        // 4.对接点做浅层的检查
        if (t.isIdentifier(path.node.right, { name: 'wq2' })) {
          log('浅层检查');
        }
        // 5.检查路径Path类型
        // 下面相当于 if (t.isIdentifier(path.node.left, { name: "bqc2" })) {
        if (path.get('left').isIdentifier({ name: 'bqc2' })) {
          log(path.get('left'));
        }
        // 7.找到特定父路径
        console.log(path.getFunctionParent());
        if (path.findParent((path) => path.isObjectExpression())) {
          console.log('找到特定父路径');
        }
        // 8.向上遍历语法树 直到找到在列表中的父节点路径
        console.log(path.getStatementParent());
      },
      Program(path) {
        log1(path.get('body.0') + '--------');
      },
    },
  };
};
