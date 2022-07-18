#### 解决不同浏览器厂商对于css的兼容性问题
- postcss-loader



```
命令行：npm i -D postcss-loader autoprefixer

根路径下创建 ： postcss.config.js
内容：
// 需要配置这个插件信息
module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8"
            ]
        })
    ]
};

webpack下module中的css/less/sass 配置中最后添加postcss-loader
eg:
 {
    test: /\.scss$/,
    use: ['style-loader','css-loader','sass-loader','postcss-loader']
}

补充：
在css-loader配置中增加配置，解决在css文件中引入其他css文件在打包过程中不添加浏览器厂商前缀的问题：

{
    test: /\.scss$/,
    use: ['style-loader',
    {
        oader: 'css-loader',
        options:{
            importLoaders:2,
            modules : true
        }
    },
    'sass-loader',
    'postcss-loader'
    ]
}

```
---
#### 字体图标使用webpack怎么配置编译呢
- file-loader

```
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        }

```
#### HtmlWebpackPlugin的作用及配置
- [ ] 命令行 cnpm i html-webpack-plugin -D
- 作用

```
将webpack编译打包好的js文件自动引入到指定的html文件中去

```
- 配置

```
在webpack配置文件中
plugins属性中增加配置：
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
            template: 'src/index.html'  // 以src/目录下的index.html为模板打包
        }
    )],
};

```
#### 清除已经打包编译好的文件
- CleanWebpackPlugin / 
- [ ] cnpm i clean-webpack-plugin -D
```
用法：
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
引入插件后 
在plugins属性数组中增加new CleanWebpackPlugin()
```
#### 怎么配置多入口文件

```
entry: {
        index :'./src/index.js',
        bundle : './src/create.js',
    },
output: {
        // name 占位符
        filename: '[name].js',
        publicPath: "https://cdn.example.com/assets/",
        path: path.join(__dirname, 'dist')
    }    

```
#### source-map的配置
- 作用
```
解决源码被webpack编译后 如果页面出现问题没办法定位问题的情况，
source-map 会生成源码映射文件 用于定位问题解决问题
```
- 如何配置
```
devtool:'inline-cheap-source-map'

不同环境使用不同的devtool值
development环境下,配置 devtool:'cheap-module-eval-source-map'
production环境下,配置 devtool:'cheap-module-source-map'
```
#### 使用webpack开启一个本地服务
- webpack-dev-server
- [ ] 命令行：cnpm i webpack-dev-server -D
- 如何配置
```
在webpack的配置文件中：
devServer: {
    contentBase: path.join(__dirname, "dist"),   // dist目录开启服务器
    compress: true,    // 是否使用gzip压缩
    port: 9000,    // 端口号
    open : true,   // 自动打开网页
    hot: true,   // 开启热更新
},

启动服务需要在package.json中增加一个script 命令
"start": "webpack-dev-server"

使用webpack-dev-server配置热更新

```
#### 项目中配置es6转es5写法
- 借助babel插件实现

```
babel配置的四大依赖包

babel-loader 
@babel/core 
<!--es5转es6的核心插件-->
@babel/preset-env
<!--垫片根据不同的浏览器环境及版本 生成es5对应的代码 有侵入性（改变源码）-->
@babel/polyfill


在webpack配置文件 module中 增加rules属性的匹配规则
{
    test: /\.js$/,
    exclude: /node_modules/, // 排除编译的代码目录
    loader: "babel-loader",
    options: {
        "presets": [
            [
                "@babel/preset-env",
                {
                    "useBuiltIns": "usage" //使用到的高级语法才会生成垫片函数方法，减少打包体积
                }
            ]
        ]
    }
}

```
#### 环境区分配置

```
新建 webpack.dev.js
新建 webpack.prod.js
新建 webpack.common.js

```
#### 配置合并
- webpack-merge
- [ ] webpack.common.js
```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const commonConfig = {
    entry: {
        main: './src/index.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.(jpg|gif|png)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit: 1024 //100KB
                }
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.scss$/,
            use: ['style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        modules: true
                    }
                },
                'sass-loader',
                'postcss-loader'
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html' // 以src/目录下的index.html为模板打包
        }),
        new CleanWebpackPlugin({
            // 不需要做任何的配置
        }),
    ],
    output: {
        filename: '[name].js',
        // publicPath: "https://cdn.example.com/assets/",
        path: path.join(__dirname, '../dist')
    }
}

module.exports = commonConfig

```
- [ ] webpack.dev.js

```
const path = require('path')
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open: true,
        hot: true,
        // hotOnly: true,
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization:{
        usedExports: true //开启treeshaking
    }
}

module.exports = merge(commonConfig, devConfig)

```
- [ ] webpack.prod.js

```
const {merge} = require('webpack-merge')
const commomConfig = require('./webpack.common')
const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
}

module.exports = merge(commomConfig, prodConfig)

```
#### 代码分隔
- webpack4中新增的插件 SplitChunksPlugin
```
module.exports = {
  //...
  optimization: {
    splitChunks: {
        chunks: "async",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendors: { 
                test: /[\\/]node_modules[\\/]/,  //匹配node_modules中的模块
                priority: -10   //优先级,当模块同时命中多个缓存组的规则时，分配到优先级高的缓存组
            },
        default: {
                minChunks: 2, //覆盖外层的全局属性
                priority: -20,
                reuseExistingChunk: true  //是否复用已经从原代码块中分割出来的模块
            }
        }
    }
  },
};

在cacheGroups外层的属性设置适用于所有的缓存组，不过每个缓存组内部都可以重新设置它们的值
chunks: "async" 这个属性设置的是以什么类型的代码经行分隔，有三个值
initial 入口代码块
all 全部
async 按需加载的代码块

minSize: 30000 模块大小超过30kb的模块才会提取
minChunks: 1, 当某个模块至少被多少个模块引用时，才会被提取成新的chunk
maxAsyncRequests: 5,分割后，按需加载的代码块最多允许的并行请求数
maxInitialRequests: 3· 分割后，入口代码块最多允许的并行请求数
automaticNameDelimiter: "~"代码块命名分割符
name: true, 每个缓存组打包得到的代码块的名称
cacheGroups 缓存组，定制相应的规则。
```
#### 懒加载配置
- npm install --save-dev @babel/plugin-syntax-dynamic-import
```
<!--.babelrc-->
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}

eg：
// create.js
async function create() {
    const {
        default: _
    } = await import(/*webpackChunkName:"lodash"*/'lodash')
    let element = document.createElement('div')
    element.innerHTML = _.join(['TianTian', 'lee'], '-')
    return element
}

function demo() {
    document.addEventListener('click', function () {
        create().then(element => {
            document.body.appendChild(element)
        })
    })
}

export default demo;

```
#### Chunk 代码块

```
Chunk是Webpack打包过程中，一堆module的集合。Webpack通过引用关系逐个打包模块，这些module就形成了一个Chunk。

个人理解： chunk是代码块， 是webpack通过模块的引用关系生成的代码块
```
### css代码提取和压缩体积
- mini-css-extract-plugin  （提取 打包编译成一个单独的css chunk代码块）
- 命令：npm install --save-dev mini-css-extract-plugi
```
将css提取为独立的文件插件，支持按需加载的css和sourceMap
建议在生产环境中配置，这个插件不支持热更新（hmr）所以只需要配置在生产环境中
eg：
<!--wepack4中需要在packjson中增加属性，避免 treeshaking（无用代码抖动即删除） -->
{
  "name": "webpack-demo",
  "sideEffects": [
    "*.css"
  ]
}

-------------
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    merge
} = require('webpack-merge')
const commomConfig = require('./webpack.common')

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename:'[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        })
    ],
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ],
        }]
    }
}

module.exports = merge(commomConfig, prodConfig)

```
- optimize-css-assets-webpack-plugin (css代码压缩)
- 命令：npm install --save-dev optimize-css-assets-webpack-plugin

```
这个插件需要在  webpack配置文件的optimization属性中增加配置

eg：webpack配置文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {
    merge
} = require('webpack-merge')
const commomConfig = require('./webpack.common')

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                parallel: true, // 启用多线程并行运行提高编译速度
            }),
            new OptimizeCSSAssetsPlugin({}),
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 类似 webpackOptions.output里面的配置 可以忽略
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        })
    ],
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // 这里可以指定一个 publicPath
                        // 默认使用 webpackOptions.output中的publicPathcss
                        // 举个例子,后台支持把css代码块放入cdn
                        publicPath: "https://cdn.example.com/css/"
                    },
                },
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ],
        }]
    },

}

module.exports = merge(commomConfig, prodConfig)


```
#### js代码压缩
- npm install -D uglifyjs-webpack-plugin
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const {
    merge
} = require('webpack-merge')
const commonConfig = require('./webpack.common')

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                parallel: true,  // 启用多线程并行运行提高编译速度
            }),
            new OptimizeCSSAssetsPlugin({}),
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 类似 webpackOptions.output里面的配置 可以忽略
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        })
    ],
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // 这里可以指定一个 publicPath
                        // 默认使用 webpackOptions.output中的publicPathcss
                        // 举个例子,后台支持把css代码块放入cdn
                        publicPath: "https://cdn.example.com/css/"
                    },
                },
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ],
        }]
    },

}

module.exports = merge(commonConfig, prodConfig)
--------------------------
建议在生产环境中配置 css js配置css和js的压缩 这样会提高效率
```


#### 其他配置处理

```
module.exports = {
    target: 'node' , // 打包出来的代码运行的环境，为了不将Node.js内置的模块打包进输出文件中
    externals: {  
        jquery:'jQuery' // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。
    },  // 开发npm包时  将一些项目中依赖的包如 axios vue 这些加入这个配置  不进行打包处理 减少npm包的体积
    libraryTarget: 'commonjs2', // 编译的代码按commonjs2规范导出渲染函数 以供采用Node.js 编写的http服务器代码调用

    resolve: {
        alias: {
            // 使用alias将导入vue的语句转换成直接使用完整的vue文件
            // 减少耗时的递归操作解析
            // 整体性强的库可以使用这种方式，如果是lodash这种库不建议使用，会影响treeshaking
            'vue': path.resolve(__dirname, './node_modules/vue/dist/vue.js'),
            // 设置路径别名，减少模块引入时相对路径的问题
            '@': path.resolve(__dirname, 'src'),
        },
        // 模块引入不加后缀时，依次匹配的顺序
        extensions: ['.ts','.js'],
    },
    module: {
        // 配置无需解析的模块
        noParse: [/vue\.min\.js$]
    }
}
```

### 构建优化
- 缩小文件搜索范围相关
1. resolve.alias 减少耗时的递归操作解析
2. module.extensions 模块引入不加后缀时，减少依次匹配的顺序时间
3. module.noParse 配置无需解析的模块
4. module.rules -> loader 增加对应的include exclude test 精准匹配对应文件，减少匹配时间
5. resolve.modules 配置第三方模块所在的位置

### dll
> .dll 为后缀的文件 叫做动态链接库 web项目引入动态链接库的目的是  减少第三方模块被重复编译时的时间
```

```
### webpack5中支持的处理方式
1. 多进程打包使用 thread-loader 建议在大的项目中使用 因为开启进程需要0.6s 不再建议使用happyPack
2. js压缩  使用wp5自带的TerserWebpackPlugin 不需要单独安装，TerserWebpackPlugin作用等同于uglifyJS 
```
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: 4,
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
```
3. css-minimizer-webpack-plugin css压缩插件
mini-css-extract-plugin css单独抽离成文件
> MiniCssExtractPlugin.loader 要放在 style-loader 后面。
```
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.module\.(scss|sass)$/,
        include: paths.appSrc,
        use: [
          "style-loader",
          isEnvProduction && MiniCssExtractPlugin.loader, // 仅生产环境
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
          {
            loader: "thread-loader",
            options: {
              workerParallelJobs: 2,
            },
          },
          "sass-loader",
        ].filter(Boolean),
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
  },
};
```

4. SplitChunksPlugin 公用代码抽离  wp5之后 不再使用commonChunkPlugin

```
module.exports = {
  splitChunks: {
    // include all types of chunks
    chunks: "all",
    // 重复打包问题
    cacheGroups: {
      vendors: {
        // node_modules里的代码
        test: /[\\/]node_modules[\\/]/,
        chunks: "all",
        // name: 'vendors', 一定不要定义固定的name
        priority: 10, // 优先级
        enforce: true,
      },
    },
  },
};
```

#### loader 开发
```
const replace = require('./replace');
const chalk = require('chalk');
function log(msg) {
  console.log(chalk.green(msg));
}

module.exports = function (content) {
  // if (this.cacheable) {
  //   this.cacheable();
  // }
  log('------------------');
  // 处理文件所在的目录
  log('处理文件所在的目录:' + this.context);
  // 当前处理的文件的完整请求路径
  log('当前处理的文件的完整请求路径:' + this.resource);
  // 当前处理的文件的路径
  log('当前处理的文件的路径:' + this.resourcePath);
  // 当前处理的文件的querystring
  log('当前处理的文件的querystring:' + this.resourceQuery);
  // 等于webpack配置的target
  log('等于webpack配置的target:' + this.target);
  log(content);
  return replace(content);
};
```