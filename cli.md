# cli based approach


1. Starte ein neues Projekt (optional):
```oc new-project gpx-viewer```

2. Deploye direkt per S2I:
```oc new-app nodejs:18~https://github.com/<dein-user>/openshift-gpx-viewer.git --name=gpx-viewer```

3. Exponiere den Service:
```oc expose svc/gpx-viewer```

4. Öffne die Route:
```oc get route gpx-viewer```


# Install Operator via cli {#operator_cli}

Following the current documentation at the time this doc was written {$date}.

[OpenShift Documentation](https://docs.redhat.com/en/documentation/openshift_container_platform/4.16/html/operators/user-tasks#olm-installing-operator-from-operatorhub-using-cli_olm-installing-operators-in-namespace)


```oc get packagemanifests argocd-operator -n openshift-marketplace```

```oc describe packagemanifests argocd-operator -n openshift-marketplace```
