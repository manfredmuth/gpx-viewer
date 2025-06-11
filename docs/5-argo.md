# Creating a new application in ArgoCD

What we will do in this section

- Add a new application in ArgoCD
- Refer to the GIT repo and the according path to the yaml aretacts
- Advice ArgoCD to create it in a namespace

![Create an application in ArgoCD](../images/app-argo-06.png)

Fill in he details which match your purpose

![Create an application in ArgoCD](../images/argo-new-app_01.png)

The source is your GIT repository and the name of the GIT subtree which hosts your app. In case you did create your own artefacts as described in [Create deployment artefacts](../docs/2-base-create-artefacts.md) you might need to switch to subtree 'k8s'.

![Create an application in ArgoCD](../images/argo-new-app_02.png)

Use the kubernetes cluster. In case this is not visible here. The user you currently use does not have the right privileges.

![Create an application in ArgoCD](../images/argo-new-app_03.png)

You now have an application which you can use.

![Create an application in ArgoCD](../images/argo-new-app_04.png)

.... ENJOY ...

|[README](../README.md)|[ BACK ](../docs/4-argo.md)|[ --- ]|