const path = require('path');
const EndWebpackPlugin = require('./plugins/EndWebpackPlugin');
module.exports = {
  entry: {
    // 多入口文件配置
    // indexTs: './src/index.ts',
    indexjs: './src/index.js',
  },
  mode: 'production',
  output: {
    // 多入口文件不同输出名字配置
    filename: '[name]_bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new EndWebpackPlugin(
      (stats) => {
        console.log('编译完成-done');
        console.log('EndWebpackPlugin');
      },
      (err) => {
        console.log(err);
      }
    ),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader'],
      },
      // 配置使用本地loader的文件地址
      {
        test: /\.js$/,
        use: ['comment-require-loader'],
        include: [path.join(__dirname, './src/')],
      },
    ],
  },
  devtool: 'source-map',
  // 配置使用本地loader的查找路径
  resolveLoader: {
    modules: ['node_modules', './loaders/'],
  },
};
