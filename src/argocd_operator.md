
[OpenShift Docs](https://docs.redhat.com/en/documentation/red_hat_openshift_gitops/1.20/html/installing_gitops/installing-openshift-gitops#installing-gitops-operator-in-web-console_installing-openshift-gitops)

1) newproject needed
``` oc new-project gpx-viewer ```

2) install the operator
``` oc apply -f argocd_operator.yaml ``` 

3) create a new ArgoCD instance
``` oc apply -f argocd_artefact.yaml ```

4) create the ArgoCD Application
``` oc apply -f argocd_create.yaml``` 

5) create the ArgoCD project
``` oc apply -f argocd_project.yaml ```

6) See the pods spin up
``` oc get pods -n openshift-gitops ``` 

7) Set some proper rights

```
oc auth can-i create buildconfigs.build.openshift.io \
  --as system:serviceaccount:openshift-gitops:openshift-gitops-argocd-application-controller \
  -n gpx-viewer

oc adm policy add-role-to-user edit \
  system:serviceaccount:openshift-gitops:openshift-gitops-argocd-application-controller \
  -n gpx-viewer

oc adm policy add-role-to-user edit \
  system:serviceaccount:openshift-gitops:openshift-gitops-argocd-server \
  -n gpx-viewer

oc auth can-i create buildconfigs.build.openshift.io \
  --as system:serviceaccount:openshift-gitops:openshift-gitops-argocd-application-controller \
  -n gpx-viewer
``` 

8) Get the route to ArgoCD and login
``` oc get routes -n openshift-gitops ```