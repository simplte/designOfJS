### 安装gulp

```
npm run gulp -D
创建项目不需要细说了
```

```
    1：使用gulp编译es6+代码
        1：安装gulp-babel插件
        
        2：创建.babelrc文件
            // 配置转换es6+语法用到的babel插件
            {
                "presets": [
                    "@babel/preset-env"
                ],
                "plugins": [
                    "@babel/plugin-transform-arrow-functions"
                ]
            }
            
    3：创建任务两种方式
        1：创建function
            ex：编译es6+代码并且压缩重命名的
            function steamTask(cb) {
                return src('src/*.js')
                    .pipe(babel())
                    .pipe(dest("output/"))
                    .pipe(uglify())
                    .pipe(rename({
                        extname: '.min.js'
                    }))
                    .pipe(dest('output/'))
            }
            exports.default = steamTask;
        2：task创建任务的形式
            task('steamTask', () => {
                 return src('src/*.js')
                    .pipe(babel())
                    .pipe(dest("output/"))
                    .pipe(uglify())
                    .pipe(rename({
                        extname: '.min.js'
                    }))
                    .pipe(dest('output/'))
            })
            使用 gulp steamTask运行任务  gulp4之后不推荐这种方式，所以使用第一种function创建任务的方式就行了
            
    4：路径匹配规则
        1： \\ 保留gulp中的保留字符  如果文件名字含有*此类的保留字符时可以使用 \\ 保留该字符
        2：*通配符 ex：src/*.js 匹配src下面所有的子级js文件
        3：** src/**.js 匹配src下面所有的js文件
        4：!表示排除带有当前符号的文件
        ['src/**/.js','!src/a.js']
        匹配src下面所有的js文件除了src下面a.js文件
        
    5：使用到的gulp插件/第三方插件
        1：gulp-babel 转义es6+语法
        2：gulp-uglify 代码压缩
        3：gulp-rename 文件重命名
            入参：{
                extname：'需要修改的后缀名如.min.js'
            }
        4:delete 删除文件
            ex:const del = require('delete');
            function (cb) {
                del(["output/*.js"], cb)
            }
        5:gulp-if 条件判断插件
            ex: 如果是js文件就使用代码压缩 第一个参数是判断条件function 第二参数判断通过然后执行的方法
            const gulpif = require('gulp-if');
            function isJS(file) {
                return file.extname == ".js"
            }
            function () {
                return src(['src/*.js', "src/*.css"])
                    .pipe(gulpif(isJS, uglify()))
                    .pipe(dest('output/'))
            };
        6：gulp-imagemin 图片压缩
           ex：
           const imagemin = require('gulp-imagemin')
           var imgSrc = 'src/img/**';
            var imgDest = 'output/img';
            // 压缩图片
            function images() {
                return src(imgSrc)
                .pipe(imagemin({optimizationLevel: 5}))
                .pipe(dest(imgDest));
            }
            function watchc() {
                watch(imgSrc,images)
            }
            exports.default = watchc;
        7：gulp-sass 编译sass文件
           gulp-minify-css 压缩css文件
            ex：
            // sass
            const sass = require('gulp-sass');
            // 压缩css gulp-minify-css
            const minifyCss = require('gulp-minify-css')
            // 重命名插件
            const rename = require('gulp-rename')
            
            
            function sass() {
                return src('style/index.scss')
                    .pipe(sass())
                    .pipe(dest('dist/style'))
                    .pipe(minifyCss())
                    .pipe(rename('index.min.css'))
                    .pipe(dest('dist/style'))
                    .pipe(conncent.reload())
            })
        8：gulp-concat 合并js文件
            ex：
            const concatJS = require('gulp-concat');
            const uglifyJS = require('gulp-uglify');
            gulp.task('javascript', () => {
                gulp.src('js/*.js')
                    .pipe(concatJS("index.js"))
                    .pipe(gulp.dest("dist/js"))
                    .pipe(uglifyJS())
                    .pipe(rename("index.min.js"))
                    .pipe(gulp.dest("dist/js"))
                    .pipe(conncent.reload())
            })
        9：gulp-connect 创建gulp服务器
            ex：如果开启实时刷新功能需要在每个执行的任务后执行connect.reload() 来告知connect需要重新执行
            
            如上面的那个例子在最后执行了 connect.reload()方法
            const conncent = require('gulp-connect');
            gulp.task('server',()=> {
                conncent.server({
                    root:'dist', // 设置启动的根目录
                    port: 8888,
                    livereload: true // 启动实时刷新功能
                })
            })
            // 同时启动监听和启动
            gulp.task('default',['watch','server'])
    6：series和parallel 执行任务的顺序
        series 顺序执行任务
            入参：可以单个任务，入参，也可以数组传入,也可以将parallel作为参数传入
        parallel 同步执行任务
            入参：可以单个任务，入参，也可以数组传入，也可以将series作为参数传入
        ex：先执行clean任务 再并行执行js css 任务
        series(clean, parallel([js, css]));
    7：dest src pipe
        src：找到源文件路径
        dest： 找到目的文件路径，如果设置的这个目的文件路径不存在，会自动创建
        pipe：任务程序运行的管道
        ex：
        exports.default = function () {
            return src(['src/*.js', "src/*.css"])
                .pipe(gulpif(isJS, uglify()))
                .pipe(dest('output/'))
        }
    8：symlink 创建软连接
        理解：类似于电脑中创建快捷方式一样 点击打开快捷方式运行程序和点击程序本身执行一样
        也等同于浅拷贝 创建的软连接文件和原本的文件指向同一内容 软连接文件和源文件修改都会修改同一指向内存
    9：registry 注册
        ex：
        const takser = require('undertaker-forward-reference')
        /* 
        registry：
            1：使用undertaker-forward-reference 插件  在registry中注册，
                保证 forward-task 任务在调用之后注册依旧有用
                如果 不将undertaker-forward-reference插件在 registry中注册
                先使用未注册的任务  再去注册任务 就会报错
                如果想要正常运行 必须按照以下顺序编写
                    task('forward-task', function (cb) {
                        cb()
                    })
                    task('default', series('forward-task'));
        */
        registry(takser())
        task('default', series('forward-task'));
        task('forward-task', function (cb) {
            cb()
        })
    10：watch 监听
    function watchTask() {
        watch('index.html', ['copy-html']);
        watch('img/**/*', ['images']);
        watch(['json/*.json', 'xml/*.xml', '!xml/4.xml'], ['data']);
        watch('js/*.js',['javascript']);
        watch('style/*.sass',['sass'])
    }
    exports.default=series('clean','watchTask')
    
```
