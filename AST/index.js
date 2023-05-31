const importFn = require('./tools/importFn');
const tsCompiler = require('typescript');
const utils = require('./utils');

function start() {
  const filePathArr = utils.scanFile();
  console.log(utils.scanFile());

  filePathArr.forEach((path) => {
    // console.log('>>>>>>>>>');
    // console.log(path);
    // 通过文件内容字符串获取AST 无上获取下文
    // const fileString = utils.readFile(path);
    // const program = tsCompiler.createSourceFile('fileString', fileString, tsCompiler.ScriptTarget.Latest, true);
    const { ast, checker } = utils.parseTs(path);
    _dealAST(ast, checker);
  });
}
function _dealAST(ast, checker) {
  function walk(node) {
    tsCompiler.forEachChild(node, walk); // 遍历AST节点
    const line = ast.getLineAndCharacterOfPosition(node.getStart()).line + 1; // 获取节点所在行
    if (tsCompiler.isImportDeclaration(node)) {
      if (node.moduleSpecifier && node.moduleSpecifier.text) {
        // 引入方法的文件名
        console.log(node.moduleSpecifier.text);
        // import a from 'xxx' 的引入方式
        if (node.importClause && node.importClause.name) {
          // 获取 导入变量 a
          console.log(node.importClause.name.escapedText);
        }
        // import {a,b} from "xxx"的引入方式
        if (node.importClause && node.importClause.namedBindings) {
          // console.log(node.importClause)
          // node.importClause.namedBindings 为namedImports类型且 node.importClause.namedBindings.element.lenght大于0 为局部导入的方式
          if (
            tsCompiler.isNamedImports(node.importClause.namedBindings) &&
            node.importClause.namedBindings.elements.length
          ) {
            const tempArr = node.importClause.namedBindings.elements;
            tempArr.forEach((element) => {
              if (tsCompiler.isImportSpecifier(element)) {
                console.log(element.name.escapedText);
                // 记录API相关信息
              }
            });
          }
        }

        // console.log(node.importClause);
        console.log('================================================');
      }
    }
  }
  walk(ast);
}

function addKey(key, filePath, line) {
  if (keyMap[key]) {
    keyMap[key].push({
      filePath,
      line,
    });
  } else {
    keyMap[key] = [
      {
        filePath,
        line,
      },
    ];
  }
}
start();
