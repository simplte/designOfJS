module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['simple-import-sort'],

  // 解析器
  // eslint-plugin-vue 里的大多数规则都需要 vue-eslint-parser 来解析 template 的AST， 然而 babel-eslint 和 vue-eslint-parser 在解析上有冲突，解决办法是把 "parser": "babel-eslint", 移入到 parserOptions 内。
  // 本项目需要对ts支持，所以需要@typescript-eslint/parser 来负责ts的语法检查
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': ['warn', { props: false }],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  overrides: [],
};
