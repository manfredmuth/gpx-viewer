# Create deployment artefacts
As mentioned in the previous section [Build base app](1-base-app-build.md) this is only needed in case you want to build your own deployment artefacts. And this step is only for those who love to do things themselves.

In [Build base app](1-base-app-build.md) we did build the app and the purpose of this step is to create deployment artefacts which can later be used to deploy an application via ArgoCD. ArgoCD is the GITOPS based approach and will be very easy to follow. It can even help in case of a desaster. Given that maybe somebody did delete your project/namespace by incident. We will come to this later.

For now all that matters is to what makes a deployment complete. In OpenShift the following artefacts are needed:

* deployment
* service
* route
* configmap
* secret
* imagestream
* buildconfig
* deploymentconfig

And all of these artefacts you could now retrieve from your current deployment.
```oc get deployment -n gpx-viewer -o yaml``` you even iterate across all of them by using a loop ```for i in deployment secret buildconfig; do oc get $i -n gpx-viewer -o yaml; done```

**BUT** you will quickly notice that in all of your yaml output there is a lot of metadata which refers to stuff you would not need. So you need to clean up all the output. And you can ease your life by simply using the [script](../src/k8s-create-artefacts.sh)

By running
```
cd src
./k8s-create-artefacts.sh gpx-viewer
```

Be aware that this script use the lightweight yaml processor which comes in the yq package of your *NIX distribution ```sudo dnf install -y yq``` 

A subdirectory k8s will be created and you find all he relevant files there. And all irrelevant metadata will be removed magically.

For our small example there are way too many artefacts. We can focus on the following yaml files

* buildconifg
* deployment
* imagestream
* route
* service

The rest of the files can be deleted.

Now what you achieved is that you did gather all relevant artefacts yourself.
**BUT** All relevant example files are already to be found in the folger [ArgoCD]() ...

|Navigation|-|-|
|:-------:|:-------:|:-------:|
|[README](../README.md)|[<- BACK](./1-base-app-build.md)|[-> NEXT](./3-argo.md)|

