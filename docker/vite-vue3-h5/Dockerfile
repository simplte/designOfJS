FROM nginx

COPY ./dist/ /usr/share/nginx/html/
COPY ./vhost.nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# 创建镜像：
# FROM nginx：基于哪个镜像
# COPY ./index.html /usr/share/nginx/html/index.html：将宿主机中的./index.html文件复制进容器里的/usr/share/nginx/html/index.html
# EXPOSE 80：容器对外暴露80端口