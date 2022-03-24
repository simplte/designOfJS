1. 页面关闭是完整发送一个请求

```
1：使用 Fetch 的 keepalive 标志  （不过请求是高优先级）
<a href="/some-other-page" id="link">Go to Page</a>

<script>
  document.getElementById('link').addEventListener('click', (e) => {
    fetch("/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        some: "data"
      }),
      keepalive: true
    });
  });
</script>
2:Navigator.sendBeacon() 方法  （低优先级请求）
<a href="/some-other-page" id="link">Go to Page</a>

<script>
  document.getElementById('link').addEventListener('click', (e) => {
    const blob = new Blob([JSON.stringify({ some: "data" })], { type: 'application/json; charset=UTF-8' });
    navigator.sendBeacon('/log', blob));
  });
</script>
```

2. 去掉页面上面的滚动条

```
如果需要隐藏一个弹窗中的滚动条
在弹窗展示区域的div中增加下面属性
::-webkit-scrollbar{
    display:none;
}
如果隐藏页面滚动条比如说vue项目中的一个页面

在template中的最外层div增加上面的属性
```
