# ArgoCD

We will install the application with help of ArgoCD and for this purpose we first need an ArgoCD installation.
* We will install ArgoCD as operator
* The operator will reside in the namespace which will have your app later (we do so in order to avoid RBAC and role binding difficulties)
* With the operator installed in the same namespace as the application we do restict ourselves at the same time. As we will not be able to recover from an accidentially deleted namesapce 


**Navigate in the Administrator view to the operator hub and choose ArgoCD**

![ArgoCD Operator](../images/argocd-01.png)

**Choose the ArgoCD operator**

![ArgoCD Operator](../images/argocd-02.png)

**Name the ArgoCD namespace gpx-viewer**

![ArgoCD Operator](../images/argocd-04.png)

**Finally install the operator**

![ArgoCD Operator](../images/argocd-05.png)

**With a little patience ... you will see the operator is installed**

Navigate to the Operators and check the installed operators view. You should see a successfully installed ArgoCD operator

![ArgoCD Operator](../images/argocd-06.png)

Next step will be to create an ArgoCD instance and to deploy your application at the same time ....

|Navigation|-|-|
|:-------:|:-------:|:-------:|
|[README](../README.md)|[BACK](./2-base-create-artefacts.md)|[-> NEXT](./4-argo.md)|
