# Build base app

This step is only to be executed in case you start from scratch and thus you - at this point - miss the deployment files which you find in the folder [ArgoCD](../ArgoCD/). As said in this GIT repo everything is already prepared but this example show how the deployment files can be created in case you are not familiar with the yaml artefacts you need.

**Create a new project**

![GPX viewer create new project](../images/gpx-viewer-01.png)

**Create a new project and add some details** if you like

![GPX viewer create new project](../images/gpx-viewer-02.png)

**Add a deployment**

Check that you are in *developer* view

![GPX viewer create new project](../images/gpx-viewer-03.png)

**Add a deplyoment from GIT**

Check that you import from GIT

![GPX viewer create new project](../images/gpx-viewer-04.png)

**Add a deplyoment from GIT**

Add the GIT repo path here

![GPX viewer create new project](../images/gpx-viewer-05.png)

You want to make sure that:
* Once you added the Git repo you see that a builder image was detected

![GPX viewer image builder info](../images/gpx-viewer-06.png)

* That you use a secure route by default. You do need to provide signed certificates if you do not have access to such certificates. OpenShift will generate a local certificate on your behalf.

![GPX viewer TLS](../images/gpx-viewer-07.png)

Now hit **Create** and obey to the demo gods ....

It will take a few seconds and you should see in the topology view a ready to use application. The route to your application is accessible via the link which is marked ....

![GPX app deployment](../images/gpx-viewer-08.png)

The next step is to create the deployment config.

|Navigation|-|-|
|:-------:|:-------:|:-------:|
|[README](../README.md)|...|[-> NEXT](./2-base-create-artefacts.md)|
