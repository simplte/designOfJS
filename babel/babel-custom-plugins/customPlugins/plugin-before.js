const chalk = require('chalk');
const { green } = chalk;
module.exports = (api, options, dirname) => {
  return {
    visitor: {
      // 匹配函数声明节点
      FunctionDeclaration(path, state) {
        // path.get('body') 相当于 path.node.body
        const pathBody = path.get('body');
        if (path.node.leadingComments) {
          // 过滤出所有匹配 @inject:xxx 字符 的注释
          const leadingComments = path.node.leadingComments.filter((comment) => /\@inject:(\w+)/.test(comment.value));
          leadingComments.forEach((comment) => {
            const injectTypeMatchRes = comment.value.match(/\@inject:(\w+)/);
            // 匹配成功
            if (injectTypeMatchRes) {
              // 匹配结果的第一个为 @inject:xxx 中的 xxx ,  我们将它取出来
              const injectType = injectTypeMatchRes[1];
              // 获取插件参数的 key， 看xxx 是否在插件的参数中声明过
              const sourceModuleList = Object.keys(options);
              if (sourceModuleList.includes(injectType)) {
                // 搜索body 内部是否有 @code:xxx 注释
                // 因为无法直接访问到 comment，所以需要访问 body内每个 AST 节点的 leadingComments 属性
                const codeIndex = pathBody.node.body.findIndex(
                  (block) =>
                    block.leadingComments &&
                    block.leadingComments.some((comment) => new RegExp(`@code:\s?${injectType}`).test(comment.value))
                );
                // 未声明则默认插入位置为第一行
                if (codeIndex === -1) {
                  // 操作`BlockStatement` 的 body
                  console.log(state.opts);
                  pathBody.node.body.unshift(api.template.statement(`${state.opts[injectType].identifierName}()`)());
                  pathBody.node.body.push(api.template.statement(`${state.opts.testCode}`)());
                } else {
                  pathBody.node.body.splice(
                    codeIndex,
                    0,
                    api.template.statement(`${state.options[injectType].identifierName}()`)()
                  );
                }
              }
            }
          });
        }
      },
      // 一个type类型有两次访问的机会
      Identifier: {
        enter() {
          console.log('Entered!');
        },
        exit() {
          console.log('Exited!');
        },
      },
      // 多个type类型共用一个函数的写法
      'Identifier|Flow'(path) {
        green(console.log('Export'));
      },
      // 类型别名 Function -》FunctionDeclaration, FunctionExpression, ArrowFunctionExpression, ObjectMethod and ClassMethod
      Function(path) {
        console.log('Function');
      },
    },
  };
};
