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
              path.node.object.type = 'ThisExpression';
              path.node.object.loc.identifierName = undefined;
              delete path.node.object.name;
            }
          }
        }
      },
    },
  };
};
