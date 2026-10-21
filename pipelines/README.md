# Rebuild gpx-viewer from GitHub

A push to `main` that changes `public/` or anything under it starts the existing OpenShift build and rolls out the new image.

Argo CD keeps the application itself. It syncs only the `ArgoCD/` directory: the Deployment, BuildConfig, ImageStream, Service, and Route. This directory is outside that path, so Argo CD does not apply it.

## What each piece is for

| Piece | Where it lives | Why it is needed |
|---|---|---|
| Secret `github-webhook-config` | cluster, project `gpx-viewer` | Holds the GitHub token and the webhook secret. Left out of git. |
| RoleBinding `edit` | `pipelines/gpx-viewer-ci.yaml` | Lets the `pipeline` service account start the build. |
| Pipeline `gpx-viewer-public` | `pipelines/gpx-viewer-ci.yaml` | The reusable rebuild. This is what the Pipelines page lists. |
| Repository `gpx-viewer` | `pipelines/gpx-viewer-ci.yaml` | Tells Pipelines as Code which GitHub repo to listen to, and which secret to use. |
| PipelineRun `gpx-viewer-public-manual` | `pipelines/gpx-viewer-ci.yaml` | Starts one build when the file is first applied. |
| PipelineRun in `.tekton/` | `.tekton/gpx-viewer-public.yaml` | The definition GitHub pushes use. Pipelines as Code only reads `.tekton/` on the commit that was pushed. |

The rebuild task runs:

```text
oc start-build gpx-viewer --follow --wait
oc rollout status deployment/gpx-viewer --timeout=300s
```

`oc start-build` needs permission to create `buildconfigs/instantiate`. The `pipeline` service account can run pods, and that permission comes from the `edit` role. The RoleBinding is the YAML form of:

```bash
oc policy add-role-to-user edit \
  system:serviceaccount:gpx-viewer:pipeline \
  -n gpx-viewer
```

## Before you apply

- Red Hat OpenShift Pipelines is installed. It creates the `pipeline` service account in `gpx-viewer`.
- The `gpx-viewer` BuildConfig and Deployment are already on the cluster, from Argo CD.
- You can log in with `oc`.

## 1. Create the GitHub secret

Pick a webhook secret, for example with `openssl rand -hex 20`. Use that same string in the GitHub webhook later.

The token is a GitHub personal access token that can read this repository and create webhooks. A classic token needs `public_repo` and `admin:repo_hook`.

```bash
oc create secret generic github-webhook-config -n gpx-viewer \
  --from-literal provider.token="<GitHub personal access token>" \
  --from-literal webhook.secret="<webhook secret>"
```

`provider.token` is how the cluster calls the GitHub API. `webhook.secret` is how the cluster checks that a delivery really came from GitHub. Pipelines as Code reads those two keys through the Repository in the manifest.

## 2. Apply the manifest

```bash
oc apply -f pipelines/gpx-viewer-ci.yaml
```

That creates the RoleBinding, the Pipeline, the Repository, and one PipelineRun. The PipelineRun starts a build immediately. Applying the file again updates the definitions and leaves that run as it is. A PipelineRun is one execution, so a second apply does not rebuild.

To start another build from the command line:

```bash
oc delete pipelinerun gpx-viewer-public-manual -n gpx-viewer --ignore-not-found
oc create -n gpx-viewer -f - <<'EOF'
apiVersion: tekton.dev/v1
kind: PipelineRun
metadata:
  generateName: gpx-viewer-public-
spec:
  pipelineRef:
    name: gpx-viewer-public
EOF
```

`generateName` is what gives every run its own name. In the console the same action is **Pipelines** → `gpx-viewer-public` → **Start**.

## 3. Let GitHub call the cluster

Pipelines as Code already has one route for the whole cluster:

`https://pipelines-as-code-controller-openshift-pipelines.apps.ocp4.rtfm.servebeer.com`

With the token from step 1, the Repository controller creates the GitHub webhook on `manfredmuth/gpx-viewer` and sends this URL. Confirm it under **Settings → Webhooks**.

The cluster ingress certificate is issued by the private OpenShift CA. GitHub rejects that certificate while SSL verification is on. On the webhook, set **SSL verification** to **Disable**. The secret field there must be the same value as `webhook.secret`.

Content type is `application/json`. The event this pipeline uses is **push**.

A delivery in **Recent deliveries** that reaches the route shows that GitHub accepted the certificate and the secret matched.

## 4. Push the `.tekton` file

Commit and push `.tekton/gpx-viewer-public.yaml` to `main`. Pipelines as Code looks in that directory on the pushed commit, then creates a PipelineRun only when all of these are true:

- the event is a push
- the branch is `main`
- at least one changed file matches `public/**`

The push that only adds `.tekton/gpx-viewer-public.yaml` does not match `public/**`, so it does not rebuild. The next push that changes a file under `public/` does.

That run uses the Pipeline object from step 2. The new image is tagged `gpx-viewer:latest`. Argo CD's last synced git revision stays where it is, because a build does not change the `ArgoCD/` manifests.
