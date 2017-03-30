#!/bin/bash

set -e

docker build -t gcr.io/${PROJECT_TEST}/${NGINX_IMAGE}:$TRAVIS_COMMIT -f docker/nginx.dockerfile .
docker build -t gcr.io/${PROJECT_TEST}/${NODE_IMAGE}:$TRAVIS_COMMIT -f docker/node.dockerfile --build-arg MONGO_URL=${MONGO_URL} .

echo $GCLOUD_SERVICE_KEY_TEST | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud --quiet config set project $PROJECT_TEST
gcloud --quiet config set container/cluster $CLUSTER
gcloud --quiet config set compute/zone ${ZONE}
gcloud --quiet container clusters get-credentials $CLUSTER

gcloud docker -- push gcr.io/${PROJECT_TEST}/${NGINX_IMAGE}
gcloud docker -- push gcr.io/${PROJECT_TEST}/${NODE_IMAGE}

yes | gcloud beta container images add-tag gcr.io/${PROJECT_TEST}/${NGINX_IMAGE}:$TRAVIS_COMMIT gcr.io/${PROJECT_TEST}/${NGINX_IMAGE}:latest
yes | gcloud beta container images add-tag gcr.io/${PROJECT_TEST}/${NODE_IMAGE}:$TRAVIS_COMMIT gcr.io/${PROJECT_TEST}/${NODE_IMAGE}:latest

kubectl config view
kubectl config current-context

kubectl set image deployment/${NGINX_DEPLOYMENT} ${NGINX_CONTAINER}=gcr.io/${PROJECT_TEST}/${NGINX_IMAGE}:$TRAVIS_COMMIT
kubectl set image deployment/${NODE_DEPLOYMENT} ${NODE_CONTAINER}=gcr.io/${PROJECT_TEST}/${NODE_IMAGE}:$TRAVIS_COMMIT
