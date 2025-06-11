#!/bin/bash

#oc apply -f argocd-artefact.yaml

USER=admin
PROJECT=gpx-argocd
GROUP=gitops-group

echo "Setting up $USER in $GROUP and project $PROJECT"

oc adm groups new $GROUP
oc adm groups add-users $USER $GROUP

oc new-project $PROJECT
oc adm policy add-role-to-user edit $USER -n $PROJECT

#oc new-project $USER-apps
#oc label ns $USER-apps argocd.argoproj.io/managed-by=$USER-gitops
#oc adm policy add-role-to-user edit $USER -n $USER-apps

echo "Setup for $USER done"
done