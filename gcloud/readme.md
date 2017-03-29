# Google Cloud  Deployment

### Init
```
$ gcloud init
$ gcloud components install kubectl
$ SETX HOME %HOMEDRIVE%%HOMEPATH%
$ gcloud config set project sanata-test
$ gcloud container clusters create sanata-cluster
$ gcloud container clusters get-credentials sanata-cluster
$ gcloud auth application-default login
$ #Replace twitter secrets in gcloud/sanata.yaml
$ kubectl create -f gcloud
```

### Deploy
```
$ npm run dockerize
$ docker tag sanata-web gcr.io/sanata-test/sanata-web
$ docker tag sanata-srv gcr.io/sanata-test/sanata-srv
$ gcloud docker push gcr.io/sanata-test/sanata-web
$ gcloud docker push gcr.io/sanata-test/sanata-srv
$ kubectl replace -f gcloud
$ kubectl proxy
```

https://medium.com/google-cloud/continuous-delivery-in-a-microservice-infrastructure-with-google-container-engine-docker-and-fb9772e81da7