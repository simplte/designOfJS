```
1: 使用esmodule需要在package.json 中增加 type: "modules"
2：如果需要用到 __dirname  需自定义  __dirname=path.resolve();
3： process.argv node命令中得参数 返回一个数组 下标为三是执行时得字定义参数
4： process.cwd() 返回当前nodejs 进程执行时所在的文件目录
5: fs.readdirSync(dir)  方法将返回一个包含“指定目录下所有文件名称”的数组对象
6：const stats = fs.statSync(src) 获取指定路径文件的详细信息
7：IstatSync方法返回一个stat数组对象
8：fs.existsSync 以同步的方法检测目录是否存在。
```

```
1: __dirname  获取当前执行文件的完整路径名
2：minimist 解析node命令，  转换成需要的对象格式

3: path.join 和path.resolve 的区别
    1：path.join将路径片段使用特定的分隔符（window：\）连接起来形成路径，并规范化生成的路径。若任意一个路径片段类型错误，会报错。
    2:path.resolve把一个路径或路径片段的序列解析为一个绝对路径。相当于执行cd操作
    /被解析为根目录
    let myPath3=path.resolve('/foo/bar', './baz');
    console.log(myPath3); // E:\foo\bar\baz
4: fs.writeFileSync 文件写入 第一个参数是写入文件的路径，第二个参数是内容
5: JSON.stringify({a:1}, null, 2) + '\n'
    //"{\n  \"a\": 1\n}\n"
```

### 工具方法

```
3：canSafelyOverwrite 判断输入地址是否是空文件夹 或者 目录是否不存在
4：isValidPackageName 正则匹配项目名称是否满足条件
5：toValidPackageName 将项目名称统一格式化
6：emptyDir 删除指定路径下的文件夹和文件

```

### 运行流程

```
1: process.cwd() 获取当前node命令执行时所在文件夹的路径
2：process.argv 返回一个数组 包含启动node进程时传入的命令参数
    数组1：node所在的目录地址
    数组2：正在执行的js文件的路径
    数组3至以后：node命令后的参数
3：使用minimist将node命令转成对象格式

4：判断处理过后的node命令 是否有提前需要的插件命令
5: 将node命令中的第一个参数作为目标文件夹
6：获取minimist解析过后的命令对象，判断是否需要强制重新创建项目
7：使用prompts 进行命令行交互 获取用户需要的配置
    propmts 几种交互方式
     type: text   文本输入  如文件名
            toggle  yes or no 的选项
            confirm 确定操作  输入 y or n
8: 获取到用户选择的项目配置

9: 生成需要创建的文件夹的绝对路径 root
10：判断是否需要覆盖已存在的文件夹 存在就覆盖不存在就创建
11：写入package.json的内容 并且使用
12: 获取模板所在的路径地址
13：render 方法如要获取需要创建的模板的路径地址
    然后执行创建模板的方法
        创建模板有两个参数 一个是 模板地址一个 ，一个是创建项目的地址

14: 根据用户配置生成需要插件的package.json 或者 相关的插件配置
15：处理用户是否选择了ts+router / router / default / 然后生成对应的main 文件
16：创建ts项目的处理
    1:将所有js文件改为ts文件
    2：将jsconfig.json 改为tsconfig.json
    3：将index.html 中的引用改成引用ts文件
17：配置中是否需要删除cypress测试文件
18：判断用户系统中可以使用的包安装工具
19：写入readme
20：加入项目执行的提示信息
```

### renderTemplate

```
renderTemplate 用于 递归创建文件

1: 获取指定路径文件的详细信息
2：判断模板路径是否是文件夹
    是文件夹：递归创建文件夹
    不是文件夹：
        1：判断是不是package.json文件
            是：
                读取package.json的内容并合并单签package.json中然后重新写
        2：是不是_开头的文件 如_gitignore 然后重命名文件以.开头
3：复制模板文件到创建的路径下
```
