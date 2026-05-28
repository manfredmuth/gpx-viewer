# GPX Viewer Monitor - ArgoCD Setup

Dieses Verzeichnis enthält die Kubernetes/ArgoCD-Konfigurationsdateien für das automatisierte Monitoring und Deployment von GPX-Dateien.

## Komponenten

### gpx-viewer-app.yaml
**ArgoCD Application**
- Monitort das Verzeichnis `public/gpx` auf Änderungen
- Synchronisiert neue GPX-Dateien automatisch in den Cluster
- **Keine automatischen Builds** - Builds werden manuell getriggert

### gpx-viewer-buildconfig.yaml
**OpenShift BuildConfig**
- Definiert den Docker-Build-Prozess
- Baut das Docker-Image aus dem Repository
- Speichert das Image im ImageStream `gpx-viewer:latest`

### gpx-viewer-imagestream.yaml
**OpenShift ImageStream**
- Container-Registry für die gebauten Docker-Images
- Wird vom BuildConfig referenziert
- Ermöglicht die Versionierung von Images

## Workflow

*ArgoCD Project deployen*
```oc apply -f ArgoCD/gpx-viewer-project.yaml```

*ImageStream deployen*
```oc apply -f ArgoCD/gpx-viewer-imagestream.yaml```

*BuildConfig deployen*
```oc apply -f ArgoCD/gpx-viewer-buildconfig.yaml```

*ArgoCD Application deployen*
```oc apply -f ArgoCD/gpx-viewer-app.yaml```

## Neue GPX-Dateien hinzufügen
```
git add public/gpx/*.gpx
git commit -m "Add new GPX tracks"
git push origin main
```

