module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    process: true
  },
  extends: ["plugin:vue/recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  plugins: ["babel", "prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // allow paren-less arrow functions
    "arrow-parens": 0, // 要求箭头函数的参数使用圆括号
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "template-curly-spacing": 0, // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    indent: 0, // 强制使用一致的缩进
    semi: [1, "always"], // 使用分号代替 ASI
    "semi-spacing": 1, // 强制分号之前和之后使用一致的空格
    "semi-style": 1, // 强制分号的位置
    "spaced-comment": 0, // 注释后加空格
    quotes: 1, // 引号 单引号双引号
    camelcase: 0, // 驼峰
    "space-before-function-paren": 0, // 方法前加空格
    eqeqeq: 1, // 全等于
    "no-unused-vars": 0, // 未使用变量
    "space-unary-ops": 0, // 一元运算符后面跟一个空格
    "operator-linebreak": 0, // 强制操作符使用一致的换行符风格
    "keyword-spacing": 0, // 强制在关键字前后使用一致的空格
    "object-curly-spacing": 0 // 强制在花括号中使用一致的空格
  }
};
