> ast 线上转换地址
> **https://astexplorer.net/**

##### ast

```
1:ast 每一层都拥有相同的结构
{
  type: "FunctionDeclaration",
  id: {...},
  params: [...],
  body: {...}
}

Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）
```

1、自定义访问者 Visitors

```
visitor: {
  // 1. 访问到ast里type为Identifier时执行
  // Identifier: {
  // 2. 一个type类型有两次访问的机会
  //   enter() {
  //     console.log('Entered!');
  //   },
  //   exit() {
  //     console.log('Exited!');
  //   },
  // },
  // 多个type类型共用一个函数的写法
  'Identifier|Flow'(path) {
    green(console.log('Export'));
  },

},
```
