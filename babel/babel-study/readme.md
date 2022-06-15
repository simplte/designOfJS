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

#### @babel/core 中的方法

1、transform/transformAsync/transformSync 转换传入的 code. 返回带有生成的代码、源映射和 AST 的对象。
2、transformFromAst/transformFromAstSync/ 给定一个 AST，转换它返回带有生成的代码、源映射和 AST 的对象。
3、transformFile 转换文件的全部内容。

#### babel 插件和预设的区别

1、babel 插件有两种 语法插件和转化插件
2、语法插件不具备具体功能实现，具体实现都在@babel/parser 中实现，语法插件只是将具体功能打开
3、转化插件指的是将源码转化输出
4、预设指的是一组插件
5、插件和预设都配置时执行顺序是：插件比预设先执行
6、纯插件执行顺序是插件数组从前向后执行
7、纯预设执行顺序是预设数组从后向前执行

#### @babel/preset-env

> @babel/preset-env 是一个智能预设，可让您使用最新的 JavaScript，而无需微观管理目标环境所需的语法转换（以及可选的浏览器 polyfill）

> 1、默认情况下，@babel/env 等于@babel/preset-es2015、@babel/preset-es2016 和@babel/preset-es2017 三个套餐的叠加

2、eg:

```
那如果我们只需要支持最新的Chrome了，可以继续修改.babelrc：
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": "last 2 Chrome versions",
         "include": ["@babel/plugin-transform-arrow-functions"]
      }
    ]
  ]
}


```

1、targets

```
targets中的含义是最新的两个Chrome版本,它也可以单独在项目中配置一个.browserslistrc文件：
last 2 Chrome versions


这样和targets字段的使用效果是一样的；正常情况下，推荐使用browserslist的配置而很少单独配置@babel/preset-env的targets
```

2、 include

> 总会启用的插件配置

```
比如我们在last 2 Chrome versions目标浏览器环境下，不会转换箭头函数和Class，但是我们可以将转换箭头函数的插件配置到include中，这样不管我们的目标浏览器怎么更换，箭头函数语法总是会转换
```

3、useBuiltIns 和 corejs

```
useBuiltIns这个属性决定是否引入polyfill，可以配置三个值：false（不引入）、usage（按需引入）和entry（项目入口处引入）；corejs表示引入哪个版本的core-js，可以选择2（默认）或者3，只有当useBuiltIns不为false时才会生效
```

4、什么是 core-js

- 它是 JavaScript 标准库的 polyfill
- 它尽可能的进行模块化，让你能选择你需要的功能
- 它和 babel 高度集成，可以对 core-js 的引入进行最大程度的优化

#### @babel/polyfill 和@babel/runtime 的区别

```
前者改造目标浏览器，让你的浏览器拥有本来不支持的特性；后者改造你的代码，让你的代码能在所有目标浏览器上运行，但不改造浏览器。

一个显而易见的区别就是打开IE11浏览器，如果引入了@babel/polyfill，在控制台我们可以执行Object.assign({}, {})；而如果引入了@babel/runtime，会提示你报错，因为Object上没有assign函数。
```
### 处理

1. 替换一个节点
```
visitor-> BinaryExpression 

BinaryExpression(path) {
  path.replaceWith(
    t.binaryExpression("**", path.node.left, t.numberLiteral(2))
  );
}
```

2. 用多节点替换单节点

```
visitor -> ReturnStatement

ReturnStatement(path) {
  path.replaceWithMultiple([
    t.expressionStatement(t.stringLiteral("Is this the real life?")),
    t.expressionStatement(t.stringLiteral("Is this just fantasy?")),
    t.expressionStatement(t.stringLiteral("(Enjoy singing the rest of the song in your head)")),
  ]);
}
```

3. 用字符串源码替换节点

```
visitor -》 FunctionDeclaration
FunctionDeclaration(path, state) {
  path.replaceWithSourceStr(function add(a, b) {
    return a + b;
  });
},
```
4. 插入兄弟节点
```
visitor -》 FunctionDeclaration

path.insertBefore(t.expressionStatement(t.stringLiteral("Because I'm easy come, easy go.")));

path.insertAfter(t.expressionStatement(t.stringLiteral('A little high, little low.')));
```
5. 删除一个节点
```
 path.remove();
```
6. 替换父节点
```
visitor -> BinaryExpression

BinaryExpression(path) {
  path.parentPath.replaceWith(
    t.expressionStatement(t.stringLiteral("Anyway the wind blows, doesn't really matter to me, to me."))
  );
}
```
7. 删除父节点
```
visitor -> BinaryExpression

BinaryExpression(path) {
  path.parentPath.remove()
}
```
