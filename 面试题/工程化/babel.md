### babel 插件的处理过程

```
1:词法解析器(Tokenizer)在这个阶段将字符串形式的代码转换为Tokens(令牌). Tokens 可以视作是一些语法片段组成的数组
2:语法解析(Syntactic Analysis)：这个阶段语法解析器(Parser)会把Tokens转换为抽象语法树(Abstract Syntax Tree，AST)
3:转换(Transform) 转换阶段会对 AST 进行遍历，在这个过程中对节点进行增删查改。Babel 所有插件都是在这个阶段工作, 比如语法转换、代码压缩。
4:最后阶段还是要把 AST 转换回字符串形式的Javascript，同时这个阶段还会生成Source Map
```
