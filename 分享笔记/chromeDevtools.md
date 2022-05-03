### 开发中常用的 DevTools

> Elements
> Console
> Source
> Network
> Lighthouse
> Performance
> Memory
> Security
> Recorder

#### Elements

1. 快速修改角度颜色
2. flex 布局页面操作徽章
   · layout -> flexBox 下面可以看到当前页面下的所有的 flex 布局元素
   · 样式中点击 flex 旁边的按钮可以修改
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
4. 刷新不清楚控制台输入信息 console -> 右上角设置 -> Preserve log

#### Network

1. 将接口返回数据存入控制台
   Preview -> Store Object as global variable -> consle 出现 tempx 就可以直接使用了

#### Source

1. watch 获取当前作用域下某个变量的值
2. BreakPotions 当前执行脚本中所打的断点
3. Call Stack 当前函数执行的调用栈
4. Scope todo
5. 断点执行按钮 从左往右

```
1: 执行直到下一个断点
2：逐行执行 不进入方法中
3：如果执行的当前行是函数或者类 会进入方法中或者是类的构造函数中
4：返回调用当前函数的那行代码处
5：todo
6：禁用所有代码
7：todo
```

6. Event Listener Breakpoints 元素事件监听
   eg: Mouse -> click
7. 给 dom 节点打断点

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

#### Network

1: filter 支持正则和一些字符串匹配 如果需要排除掉一些请求前面加 - 就可以忽略这些请求
2：Disable cache 忽略缓存选项

```
会在请求头中增加缓存头
http1.0 pragme:no-cache
http1.1 cache-control:no-cache
```

3. 阻止某些请求

- 工具栏三个点 -> more tools -> network request blocking

```
eg: add pattern
usecar/icon_security_entrance@2x.gif
```

#### lighthouse

- Performance - 性能检测，如网页的加载速度、响时间等

- Accessibility - 铺助检测，如网页的可访问性问题，HTML 代码标签之类的优化等

- Best Practices - 实践性检测，如网页安全性，如是否开启 HTTPS、网页存在的漏洞等

- SEO - 搜索引擎优化检测，如网页 title 是否符合搜索引擎的优化标准等

- FCP: 首次绘制到屏幕上

- Speed Index:

```
速度指数衡量的是内容在页面加载过程中的视觉显示速度。
Lighthouse首先会在浏览器中捕获一段页面加载的视频，并计算出各帧之间的视觉进度。
然后，Lighthouse使用Speedline Node.js模块来生成速度指数得分。

使用Opportunities 中给出的优化项进行处理优化
```

- LCP: 最大内容画 在视口中可见的最大图像或文本块的渲染时间 为了提供良好的用户体验，网站应该努力使最大内容画幅达到 2.5 秒或更少
- CLS: 累积布局偏移 它量化了页面内容在视觉上的移动程度，CLS 得分低是给开发者的一个信号，表明他们的用户没有经历不必要的内容移动

#### Performance 性能

- eg: https://googlechrome.github.io/devtools-samples/jank/

1. 降低性能 cpu 性能

- Performance -> CPU

2. Frames 查看 fps 帧数 卡顿时会标红

3. 查看 Network 栏 分析哪次请求耗时较长
4. Call tree 显示哪些 js 代码执行比较耗时

#### Memory 内存监控

```

```
