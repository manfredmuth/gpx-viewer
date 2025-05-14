#!/bin/bash

# Namespace to export from
NAMESPACE="${1:-default}"

# Output directory
OUT_DIR="./k8s"
mkdir -p "$OUT_DIR"

# Resources to export
RESOURCES=(
  deployment
  service
  route
  configmap
  secret
  imagestream
  buildconfig
  deploymentconfig
)

echo "Exporting resources from namespace: $NAMESPACE"
echo "Output directory: $OUT_DIR"
echo "----------------------------"

# Function to clean up the YAML output using yq if available
clean_yaml() {
  if command -v yq &> /dev/null; then
    yq eval 'del(.metadata.uid, .metadata.resourceVersion, .metadata.creationTimestamp, .metadata.generation, .metadata.managedFields, .status)' -
  else
    cat
  fi
}

for RESOURCE in "${RESOURCES[@]}"; do
  ITEMS=$(oc get "$RESOURCE" -n "$NAMESPACE" --no-headers -o custom-columns=":metadata.name" 2>/dev/null)

  for NAME in $ITEMS; do
    echo "Exporting $RESOURCE/$NAME"
    oc get "$RESOURCE" "$NAME" -n "$NAMESPACE" -o yaml | clean_yaml > "$OUT_DIR/${RESOURCE}-${NAME}.yaml"
  done
done

echo "✅ Export complete. Files saved in $OUT_DIR"

