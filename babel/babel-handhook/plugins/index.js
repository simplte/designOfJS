// const updateParamNameVisitor = {
//   // enter 只能用在traverse 中
//   enter(path) {
//     if (this.t.isIdentifier(path.node, { name: this.pn })) {
//       path.node.name = 'qc';
//     }
//   },
// };
// module.exports = ({ types: t }) => {
//   return {
//     visitor: {
//       FunctionDeclaration(path) {
//         const param = path.node.params[0];
//         const pn = param.name;
//         param.name = 'Q';
//         path.traverse(updateParamNameVisitor, { t, pn });
//       },
//     },
//   };
// };

// ======

module.exports = ({ types: t }) => {
  return {
    visitor: {
      BinaryExpression(path, state) {
        console.log('=========');
        console.log(path.node.operator);
        // console.log(path.get('left'));
        if (path.node.operator !== '===') return;
        // 检查identifier节点
        if (!t.isIdentifier(path.node.left, { name: 'n' })) {
          console.log('true');
        }

        // 转换左边变量
        path.node.left = t.identifier('bqc');
        path.node.right = t.identifier('wq');
      },
      Identifier(path, state) {
        // 检查identifier节点是否被引用
        if (path.isReferencedIdentifier()) {
          console.log('被引用');
          console.log(path.node.name);
        }
      },
      // save
      MemberExpression(path, state) {
        console.log('=--------------------------------');
        console.log(path.node.object.name);
        if (path.node.object.name == 'xp') {
          console.log(path.node.property.name);
          const propertyName = path.node.property.name;
          if (!propertyName.startsWith('$')) {
            path.node.property.name = `$${propertyName}`;
          }
          delete path.node.object.name;
          path.node.object.loc.identifierName = undefined;
          path.node.object.type = 'ThisExpression';
        } else if (path.node.object.name == 'ctx') {
          const funName = path.node.property.name;
          if (funName == 'get') {
            const firstArg = path.parent.arguments[0];
            if (firstArg.type == 'StringLiteral') {
              // ctx.get('xxx') => this.$refs.xxx
              // 处理ctx => this
              delete path.node.object.name;
              path.node.object.loc.identifierName = undefined;
              path.node.object.type = 'ThisExpression';

              // 处理 get => $refs
              path.node.property = {
                type: 'Identifier',
                loc: {
                  identifierName: '$refs',
                },
                name: '$refs',
              };

              // 处理('xxx')=> .xxx
              path.parent.type = 'MemberExpression';
              path.parent.object = path.node;
              path.parent.property = {
                type: 'Identifier',
                loc: {
                  start: {},
                  end: {},
                  identifierName: firstArg.value,
                },
                name: firstArg.value,
              };
              delete path.parent.arguments;
              delete path.parent.callee;
            } else if (firstArg.type == 'Identifier') {
              // ctx.get(code) => this.$refs.xxx
              // ctx => this
              delete path.node.object.name;
              path.node.object.loc.identifierName = undefined;
              path.node.object.type = 'ThisExpression';

              // get => $refs
              path.node.property = {
                type: 'Identifier',
                loc: {
                  identifierName: '$refs',
                },
                name: '$refs',
              };

              // 处理(code) => .code
              path.parent.type = 'MemberExpression';
              path.parent.object = path.node;
              path.parent.property = {
                type: 'Identifier',
                loc: {
                  start: {},
                  end: {},
                  identifierName: firstArg.name,
                },
                name: firstArg.name,
              };
              delete path.parent.arguments;
              delete path.parent.callee;
            } else if (firstArg.type == 'MemberExpression') {
              // ctx.get(codes[i]) => this.$refs[codes[i]]
              // this

              // 自己的写法
              path.node.object.type = 'ThisExpression';
              delete path.node.object.name;

              path.node.property = {
                type: 'Identifier',
                loc: {
                  identifierName: '$refs',
                },
                name: '$refs',
              };

              path.parent.type = 'MemberExpression';
              path.parent.object = path.node;
              path.parent.property = firstArg;
              path.parent.computed = true;
              delete path.parent.callee;
              delete path.parent.arguments;

              // 文章上的写法
              // path.node.object.loc.identifierName = undefined;
              // path.node.object.type = 'MemberExpression';
              // delete path.node.object.name;
              // path.node.object.object = {
              //   type: 'ThisExpression',
              //   loc: {
              //     start: {},
              //     end: {},
              //   },
              // };

              // path.node.object.property = {
              //   type: 'Identifier',
              //   loc: {
              //     identifierName: '$refs',
              //   },
              //   name: '$refs',
              // };

              // path.node.property = firstArg;
              // path.parent.type = 'MemberExpression';
              // path.parent.object = path.node.object;
              // path.parent.property = path.node.property;
              // path.parent.computed = true;
              // delete path.parent.arguments;
              // delete path.parent.callee;
            }
          }
        }
      },
    },
  };
};
