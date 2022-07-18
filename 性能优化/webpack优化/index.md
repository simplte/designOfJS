#### DllPlugin
- 优势
```
以dz项目为例
执行 webpack_dll.config.js 生成 dll 库

然后执行 webpack.prod.js 生成业务代码的时间为 6000左右毫秒

如果去掉 webpack.prod.js 中使用 dll库的配置，打包业务代码需要 8000多毫秒
new webpack.DllReferencePlugin({
  context: __dirname,
  // manifest就是我们第一步中打包出来的json文件
  manifest: require('./dist-fest/vendormanifest.json'),
}),
```
- 配置方式
```
1: 配置 webpack_dll.config.js 运行后生成 dll文件
2：在打包业务模块的代码中增加插件配置
new webpack.DllReferencePlugin({
  context: __dirname,
  // manifest就是我们第一步中打包出来的json文件
  manifest: require('./dist-fest/vendormanifest.json'),
}),
运行生成打包代码
```
### 多进程打包 wp5 
```

 optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
```
