#### 反向代理的用途和好处

```
安全性：正向代理的客户端能够在隐藏自身信息的同时访问任意网站，这个给网络安全代理了极大的威胁。因此，我们必须把服务器保护起来，使用反向代理客户端用户只能通过外来网来访问代理服务器，并且用户并不知道自己访问的真实服务器是那一台，可以很好的提供安全保护。

功能性：反向代理的主要用途是为多个服务器提供负债均衡、缓存等功能。负载均衡就是一个网站的内容被部署在若干服务器上，可以把这些机子看成一个集群，那 Nginx 可以将接收到的客户端请求“均匀地”分配到这个集群中所有的服务器上，从而实现服务器压力的平均分配，也叫负载均衡。
```

### 主要关注的文件夹及文件

> 安装好 nginx 之后 可以执行 rpm -ql nginx 查看 nginx 被安装的地方 以及有哪些相关的目录

1. /etc/nginx/conf.d/ 子配置的配置项存放处 /etc/nginx/nginx.conf 主配置中一般都默认把这个文件夹下的自配置都引入
2. /etc/nginx/nginx.conf nginx 主配置文件
3. /usr/share/ngnix/html/ 这个文件夹下通常放静态文件

### nginx 配置语法

1. nginx.conf 主配置文件

```
main        # 全局配置，对全局生效
├── events  # 配置影响 Nginx 服务器或与用户的网络连接
├── http    # 配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
│   ├── upstream # 配置后端服务器具体地址，负载均衡配置不可或缺的部分
│   ├── server   # 配置虚拟主机的相关参数，一个 http 块中可以有多个 server 块
│   ├── server
│   │   ├── location  # server 块可以包含多个 location 块，location 指令用于匹配 uri
│   │   ├── location
│   │   └── ...
│   └── ...
└── ...
```

### gzip

> 配置 gzip

```
1. 浏览器请求时携带请求头 ： Accept-Encoding: gzip
2. 服务器响应时携带： content-encoding: gzip

3.
gzip on; # 默认off，是否开启gzip
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

4. 最好小于1kb的文件不压缩
gzip_min_length 1k;

5. 最好使用webpack完成gzip压缩生成gz文件上传，减少服务器的计算资源消耗
```

link: https://juejin.cn/post/6844904144235413512#heading-12
