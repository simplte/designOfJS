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

#### Console

1. 表格输出 console.table()
2. 断言 console.assert() 断言失败： Assertion failed: console.assert
3. console.debug()

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

#### Network

1: filter 支持正则和一些字符串匹配 如果需要排除掉一些请求前面加 - 就可以忽略这些请求
2：Disable cache 忽略缓存选项

```
会在请求头中增加缓存头
http1.0 pragme:no-cache
http1.1 cache-control:no-cache
```

#### lighthouse

```

```
