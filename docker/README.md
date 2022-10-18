#### 容器命令

```sh
Usage:  docker ps [OPTIONS]

List containers

Options:
  -a, --all             显示所有容器（默认显示正在运行）
  -f, --filter filter   根据提供的条件过滤输出
      --format string   使用Go模板的漂亮打印容器
      --help            打印使用
  -n, --last int        显示最后创建的n个容器（包括所有状态）（默认值为-1）
  -l, --latest          显示最新创建的容器（包括所有状态）
      --no-trunc        不要截断输出
  -q, --quiet           仅显示数字ID
  -s, --size            显示总文件大小
```

### 编写 dockerfile

```shell
FROM nginx

COPY ./index.html /usr/share/nginx/html/index.html

EXPOSE 80
```

1. FROM nginx：基于哪个镜像
2. COPY ./index.html /usr/share/nginx/html/index.html：将宿主机中的./index.html 文件复制进容器里的/usr/share/nginx/html/index.html
3. EXPOSE 80：容器对外暴露 80 端口

### 创建镜像

1. 进入目标项目根目录
2. 创建镜像： docker image build ./ -t xxx:x.x.x

- docker image build 创建镜像命令
- ./ 基于当前路径
- -t xxx 镜像名 xxx
- :x.x.x 版本号

### 根据镜像创建容器

```sh
docker container create -p 2333:80 hello-docker:1.0.0
docker container start xxx
```
