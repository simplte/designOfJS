const tsCompiler = require('typescript');

function importFn() {}
function walk(node) {
  tsCompiler.forEachChild(node, walk); // 遍历AST节点
  const line = node.getLineAndCharacterOfPosition(node.getStart()).line + 1;
  if (tsCompiler.isFunctionDeclaration(node)) {
    // if (tsCompiler.isIdentifier(node)) {
    //   console.log(node.);
    console.log('=====');
    // }
  }
}
module.exports = {
  importFn,
};
