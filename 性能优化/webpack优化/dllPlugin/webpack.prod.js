const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // 输出格式设置为module以后执行js会报错
    libraryTarget: 'module',
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          // 配置babel
          {
            // 指定加載器
            loader: 'babel-loader',
            // 设置babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  '@babel/preset-env',

                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      chrome: '88',
                    },

                    // 指定corejs版本
                    corejs: '3',

                    // 使用corejs的方式  按需加载
                    useBuiltIns: 'usage',
                  },
                ],
              ],
            },
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'production',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    // 需要打包的文件后缀
    extensions: ['.tsx', '.ts', '.js'],
  },
  // 全局引入fabric
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      // manifest就是我们第一步中打包出来的json文件
      manifest: require('./dist-fest/vendor.manifest.json'),
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      fabric: 'fabric',
    }),
  ],
  optimization: {
    // 告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle。
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 多进程打包
        parallel: true,
        // 代码压缩配置
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
  },
};
