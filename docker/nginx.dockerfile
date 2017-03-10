FROM nginx
COPY web/build /usr/share/nginx/html

# docker build -t sanata-web -f docker/nginx.dockerfile .
# docker run -p 3030:80 sanata-web 