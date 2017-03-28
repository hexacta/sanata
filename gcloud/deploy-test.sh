#!/bin/bash

set -e
set -x

docker build -t gcr.io/${PROJECT_NAME_TEST}/${NGINX_IMAGE_NAME}:$TRAVIS_COMMIT -f docker/nginx.dockerfile .
docker build -t gcr.io/${PROJECT_NAME_TEST}/${NODE_IMAGE_NAME}:$TRAVIS_COMMIT -f docker/node.dockerfile .

echo $GCLOUD_SERVICE_KEY_TEST | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud --quiet config set project $PROJECT_NAME_TEST
gcloud --quiet config set container/cluster $CLUSTER_NAME
gcloud --quiet config set compute/zone ${CLOUDSDK_COMPUTE_ZONE}
gcloud --quiet container clusters get-credentials $CLUSTER_NAME

gcloud docker push gcr.io/${PROJECT_NAME_TEST}/${NGINX_IMAGE_NAME}
gcloud docker push gcr.io/${PROJECT_NAME_TEST}/${NODE_IMAGE_NAME}

yes | gcloud beta container images add-tag gcr.io/${PROJECT_NAME_TEST}/${NGINX_IMAGE_NAME}:$TRAVIS_COMMIT gcr.io/${PROJECT_NAME_TEST}/${NGINX_IMAGE_NAME}:latest
yes | gcloud beta container images add-tag gcr.io/${PROJECT_NAME_TEST}/${NODE_IMAGE_NAME}:$TRAVIS_COMMIT gcr.io/${PROJECT_NAME_TEST}/${NODE_IMAGE_NAME}:latest

kubectl config view
kubectl config current-context

kubectl set image deployment/${NGINX_DEPLOYMENT_NAME} ${NGINX_DEPLOYMENT_CONTAINER_NAME}=gcr.io/${PROJECT_NAME_TEST}/${NGINX_IMAGE_NAME}:$TRAVIS_COMMIT
kubectl set image deployment/${NODE_DEPLOYMENT_NAME} ${NODE_DEPLOYMENT_CONTAINER_NAME}=gcr.io/${PROJECT_NAME_TEST}/${NODE_IMAGE_NAME}:$TRAVIS_COMMIT
