### 开发中常用的 DevTools

> Elements
> Console
> Source
> Network
> Lighthouse
> Performance
> Security

#### Elements

1. 快速修改角度颜色

```
css:
background-image: linear-gradient(107deg, black, transparent);
```

2. flex 布局页面操作徽章
   · layout -> flexBox 下面可以看到当前页面下的所有的 flex 布局元素
   · 样式中点击 flex 旁边的按钮可以修改
3. 开启标尺 偏好设置-> Elements -> show Rulers...

4. 高亮页面中正在重绘的 dom

- 工具栏三个点 -> more tools -> Rendering -> Paint flashing

5. 监听/调试页面动画

- 工具栏三个点 -> more tools -> Rendering -> Animations

#### Console

1. 表格输出 console.table()
2. 断言 console.assert() 断言失败： Assertion failed: console.assert
3. console.debug()
4. 刷新页面后不清除控制台输入信息 console -> 右上角设置 -> Preserve log

#### Network

1. 将接口返回数据存入控制台
   Preview -> Store Object as global variable -> console 出现 tempx 就可以直接使用了

2. filter 支持正则和一些字符串匹配 如果需要排除掉一些请求前面加 - 就可以忽略这些请求
3. Disable cache 忽略缓存选项

```
会在请求头中增加缓存头
http1.0 pragme:no-cache
http1.1 cache-control:no-cache
```

4. 阻止某些请求

- 工具栏三个点 -> more tools -> network request blocking

```
eg: add pattern
usecar/icon_security_entrance@2x.gif
```

#### Source

1. watch 获取当前作用域下某个变量的值
2. BreakPotions 当前执行脚本中所打的断点
3. Call Stack 当前函数执行的调用栈
4. Scope 作用域数据

- local 当前作用域
- global 全局作用域

5. 断点执行按钮 从左往右

```
1: 执行直到下一个断点
2：逐行执行 不进入方法中
3：如果执行的当前行是函数或者类 会进入方法中或者是类的构造函数中
4：返回调用当前函数的那行代码处
5：单步执行
6：禁用所有断点
```

6. Event Listener Breakpoints 元素事件监听
   eg: Mouse -> click
7. 给 dom 节点打断点 break on

```
1: subtree modifications 子节点内容改变（增加/删除）时触发断点 不包括子节点属性的改变
2：attribute modifications 当前节点属性改变时触发断点
3：node removel  当前节点删除的时候触发断点
eg:
document.getElementsByClassName("col-12 marg5-left row cen-between  height120")[0].removeChild(document.getElementsByClassName("col-12 marg5-left row cen-between  height120")[0].childNodes[0])
```

8. xhr/fetch Breakpoionts 给某个请求打断点

- 默认有一个选项 Any XHR or fetch 会拦截所有的请求
- 增加一个 eg: queryInfo 断点就在发起这个请求的脚本中触发

9. 对混淆过后的代码进行格式化 选中混淆过脚本/css 文件后 点击 {} 按钮对混淆过代码进行格式化

10. 选中 js/css 进行修改 然后保存可以快速生效，避免热启动耗时，方便调试

11. 编辑器内修改项目文件查看效果

- Source->左边栏->Filesystem-> Add folder to workspace 导入项目，修改后能实时同步到本地文件

#### lighthouse

- Performance - 性能检测，如网页的加载速度、响时间等

- Accessibility - 铺助检测，如网页的可访问性问题，HTML 代码标签之类的优化等

- Best Practices - 实践性检测，如网页安全性，如是否开启 HTTPS、网页存在的漏洞等

- SEO - 搜索引擎优化检测，如网页 title 是否符合搜索引擎的优化标准等

- FCP: 即浏览器首次将任意内容（如文字、图像、canvas 等）绘制到屏幕上的时间点。

> 提高 FCP 的核心理念只有两个 减少初始化视图内容和 减少初始化下载资源大小

- Speed Index: 速度指数就是衡量页面内容填充的速度

```
速度指数如何计算的：
Lighthouse首先会在浏览器中捕获一段页面加载的视频，并计算出各帧之间的视觉进度。
然后，Lighthouse使用Speedline Node.js模块来生成速度指数得分。

使用Opportunities 中给出的优化项进行处理优化
```

- LCP: 度量标准报告视口内可见的最大图像或文本块的呈现时间

```
何时会上报LCP:
图片、视频以及大量文本绘制完成后就会报告LCP

如何优化：
减少首屏渲染的图片以及视频内容大小后，整体分数显著提高
为了提供良好的用户体验，网站应该努力使最大内容画幅达到 2.5 秒或更少
```

- CLS: 非预期布局偏移得分的总和

```
解释：
衡量的是页面整个生命周期中每次元素发生的非预期布局偏移得分的总和。
每次可视元素在两次渲染帧中的起始位置不同时，就说是发生了 LS（Layout Shift），
CLS 得分低是给开发者的一个信号，表明他们的用户没有经历不必要的内容移动
```

- TTI 指的是所有的页面内容都已经成功加载，且能够快速地对用户的操作做出反应的时间点。

- TBT 指 First Contentful Paint 首次内容绘制 (FCP)与 Time to Interactive 可交互时间 (TTI)之间的总时间

#### Performance 性能

- eg: https://googlechrome.github.io/devtools-samples/jank/

1. 降低 cpu 性能

- Performance -> CPU

2. Frames 查看 fps 帧数 卡顿时会标红

3. 查看 Network 栏 分析哪次请求耗时较长
4. Call tree 显示哪些 js 代码执行比较耗时
