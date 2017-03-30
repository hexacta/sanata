FROM nginx:alpine
COPY web/build /usr/share/nginx/html
COPY docker/nginx.node.conf /etc/nginx/conf.d/default.conf

# docker build -t sanata-web -f docker/nginx.dockerfile .
# docker run -p 3030:80 sanata-web 