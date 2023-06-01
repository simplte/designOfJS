const importFn = require('./tools/importFn');
const tsCompiler = require('typescript');
const utils = require('./utils');

let importItems = {};
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
    _dealAST(ast, checker, path);
  });
}
function _dealAST(ast, checker, path) {
  function walk(node) {
    tsCompiler.forEachChild(node, walk); // 遍历AST节点
    const line = ast.getLineAndCharacterOfPosition(node.getStart()).line + 1; // 获取节点所在行
    if (tsCompiler.isImportDeclaration(node)) {
      // 命中target
      if (node.moduleSpecifier && node.moduleSpecifier.text && node.moduleSpecifier.text) {
        // 存在导入项
        if (node.importClause) {
          // default直接导入场景
          if (node.importClause.name) {
            let temp = {
              name: node.importClause.name.escapedText,
              origin: null,
              symbolPos: node.importClause.pos,
              symbolEnd: node.importClause.end,
              identifierPos: node.importClause.name.pos,
              identifierEnd: node.importClause.name.end,
              line: line,
            };
            dealImports(temp);
          }
          if (node.importClause.namedBindings) {
            // 拓展导入场景，包含as情况
            if (tsCompiler.isNamedImports(node.importClause.namedBindings)) {
              if (node.importClause.namedBindings.elements && node.importClause.namedBindings.elements.length > 0) {
                // console.log(node.importClause.namedBindings.elements);
                const tempArr = node.importClause.namedBindings.elements;
                tempArr.forEach((element) => {
                  if (tsCompiler.isImportSpecifier(element)) {
                    let temp = {
                      name: element.name.escapedText,
                      origin: element.propertyName ? element.propertyName.escapedText : null,
                      symbolPos: element.pos,
                      symbolEnd: element.end,
                      identifierPos: element.name.pos,
                      identifierEnd: element.name.end,
                      line: line,
                    };
                    dealImports(temp);
                  }
                });
              }
            }
            // * 全量导入as场景
            if (tsCompiler.isNamespaceImport(node.importClause.namedBindings) && node.importClause.namedBindings.name) {
              let temp = {
                name: node.importClause.namedBindings.name.escapedText,
                origin: '*',
                symbolPos: node.importClause.namedBindings.pos,
                symbolEnd: node.importClause.namedBindings.end,
                identifierPos: node.importClause.namedBindings.name.pos,
                identifierEnd: node.importClause.namedBindings.name.end,
                line: line,
              };
              dealImports(temp);
            }
          }
        }
      }
    }
  }
  function dealImports(temp) {
    importItems[temp.name] = {};
    importItems[temp.name].origin = temp.origin;
    importItems[temp.name].symbolPos = temp.symbolPos;
    importItems[temp.name].symbolEnd = temp.symbolEnd;
    importItems[temp.name].identifierPos = temp.identifierPos;
    importItems[temp.name].identifierEnd = temp.identifierEnd;
    importItems[temp.name].line = temp.line;
    importItems[temp.name].path = path;
  }
  walk(ast);
  console.log(importItems);
}

start();
