```
1: 使用esmodule需要在package.json 中增加 type: "modules"
2：如果需要用到 __dirname  需自定义  __dirname=path.resolve();
3： process.argv node命令中得参数 返回一个数组 下标为三是执行时得字定义参数
4： process.cwd() 返回当前nodejs 进程执行时所在的文件目录
```