FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ARG MONGO_URL
COPY server/dist /usr/src/app
ENV NPM_CONFIG_LOGLEVEL warn
ENV MONGO_URL $MONGO_URL
EXPOSE 8080
CMD [ "node", "server.js" ]

# docker build -t sanata-srv -f docker/node.dockerfile .
# docker run -p 8888:8080 sanata-srv 