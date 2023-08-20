const glob = require('glob');
const path = require('path');
const fs = require('fs');
const tsCompiler = require('typescript');

function scanFile() {
  return glob.sync(path.join(__dirname, '../source/**/*.js'));
}
function readFile(filename) {
  return fs.readFileSync(filename, 'utf8');
}
function writeFile(filename, content) {
  fs.writeFileSync(filename, content, 'utf8');
}

/**
 * 获取项目所有wxml文件
 * @returns
 */
function scanWxmlFile() {
  return glob.sync(path.join('/Users/bqc/projects/carProjects/tcel-main-lite', '/page/usecar/**/*.wxml'));
}

/**
 * 修改文件路径扩展名
 * @param {*} url
 * @param {*} ext
 * @returns
 */
function changeFileExt(url, ext) {
  let pathObj = path.parse(url);
  pathObj.ext = ext;
  delete pathObj.base;
  const newFilePath = path.format(pathObj);
  return newFilePath;
}

/**
 * ts/js 文件 获取ast
 * @param {*} fileName
 * @returns
 */
function parseTs(fileName) {
  // 将ts代码转化为AST
  //   console.log(fileName);
  const program = tsCompiler.createProgram([fileName], { allowJs: true });
  const ast = program.getSourceFile(fileName);
  const checker = program.getTypeChecker();
  //   console.log(ast);
  return { ast, checker };
}
module.exports = {
  scanFile,
  readFile,
  parseTs,
  scanWxmlFile,
  changeFileExt,
  writeFile,
};

// 判断节点类型的函数，返回值类型为 boolean
// tsCompiler.isFunctionDeclaration(node);            // 判定是否为函数声明节点
// tsCompiler.isArrowFunction(node);                  // 判定是否为箭头函数
// tsCompiler.isTypeReferenceNode(node);              // 判定是否为Type类型节点
// tsCompiler.isVariableDeclaration(node);            // 判定是否为变量声明节点
// tsCompiler.isIdentifier(node);                     // 判定是否为Identifier节点
