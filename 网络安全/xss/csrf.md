### csrf

```
跨站请求伪造

攻击网站利用用户登录过后网站 存在浏览器中cookie  恶意请求 用户访问过的网站从而进行转账 用户信息篡改等恶意请求，图片是流程

防御措施：
1：验证 HTTP Referer 字段；
2：在请求地址中添加 token 并验证；
可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求
3：在 HTTP 头中自定义属性并验证。
```

### xss

```
1: 跨站脚本攻击

利用网页中的输入框恶意输入js脚本，在没有进行xss 防护的网站中进行恶意请求，获取用户token等

预防措施：
对输入框中的 <   > 等符号进行encodede编码处理
```

### 简单请求和非简单请求

```
1:简单请求需要满足一下条件中的两项，否则都是非简单请求
   1、请求方式：HEAD、GET、POST
    2、请求头信息：
        Accept
        Accept-Language
        Content-Language
        Last-Event-ID
        Content-Type 对应的值是以下三个中的任意一个
                                application/x-www-form-urlencoded
                                multipart/form-data
                                text/plain

2：非简单请求会进行预请求
- 请求方式：OPTIONS
- “预检”其实做检查，检查如果通过则允许传输数据，检查不通过则不再发送真正想要发送的消息
- 如何“预检”
     => 如果复杂请求是PUT等请求，则服务端需要设置允许某请求，否则“预检”不通过，验证请求方法是支持
        Access-Control-Request-Method
     => 如果复杂请求设置了请求头，则服务端需要设置允许某请求头，否则“预检”不通过 验证请求头中的数据是否支持
        Access-Control-Request-Headers
```
