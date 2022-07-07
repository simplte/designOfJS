const replace = require('./replace');
const chalk = require('chalk');
function log(msg) {
  console.log(chalk.green(msg));
}

module.exports = function (content) {
  // if (this.cacheable) {
  //   this.cacheable();
  // }
  log('------------------');
  // 处理文件所在的目录
  log('处理文件所在的目录:' + this.context);
  // 当前处理的文件的完整请求路径
  log('当前处理的文件的完整请求路径:' + this.resource);
  // 当前处理的文件的路径
  log('当前处理的文件的路径:' + this.resourcePath);
  // 当前处理的文件的querystring
  log('当前处理的文件的querystring:' + this.resourceQuery);
  // 等于webpack配置的target
  log('等于webpack配置的target:' + this.target);
  log(content);
  return replace(content);
};
