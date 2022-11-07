> 前端静态项目 cicd 流程：
> 推送远程 master 后自动执行构建命令，生成 dist 产物，使用 dist 产物生成 docker image 镜像并推送远程 dockerhub

### 创建文件

1. 创建 .github/workflows/mian.yml
2. 根路径创建 Dockerfile
3. 创建 vhost.nginx.conf

#### main.yml

> 具体参考 main.yml

- 具体语法及参数以及使用到的 github action 介绍

```
name workflow 的名称
on 触发条件
    push:
        branches: 触发分支
            - master
jobs: 具体执行脚本
    build-and-deploy: 脚本名称
        runs-on: ubuntu-latest 运行环境 运行在最新版ubuntu系统中
        steps: 具体步骤
        - name: Checkout 🛎️
          uses: actions/checkout@v3 使用的action 使用checkout@v2这个action获取源码
          with: 如果使用这个action必须设置persist-credentials
            persist-credentials: false

        # 打包编译项目
        - name: Install and Build 🔧
          # 执行具体命令
          run: |
            yarn
            yarn build:test
            cp dist/index.html dist/404  .html

        # 登陆docker
        - name: login docker 🚀
            uses: docker/login-action@v2
            # secrets.DOCKER_USERNAME 定义在项目settings->secrets -> action -> Repository secrets 新增dockerhub的账号密码信息
            with:
              username: ${{ secrets.  DOCKER_USERNAME }}
              password: ${{ secrets.  DOCKER_PASSWORD }}

        # 打包生成docker镜像
        - name: Extract metadata (tags, labels) for Docker  🚀
            id: meta
            uses: docker/metadata-action@v3
            with:
              images: vite-vue3-h5:0.0.2

        # 将生成docker镜像 推动到远程docker账号下
        - name: Build and push Docker image 🚀
            uses: docker/build-push-action@v2
            with:
            context: .
            push: true
            # 这个地方注意 tags 的名称一定要一dockerhub的账号名/ 开始否则会提示没有权限
            tags: simplte/vite-vue3-h5:0.0.2
            labels: vite-vue3-h5-labels
```

#### Dockerfile

> 见上层 readme.md
