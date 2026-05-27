# See ArgoCD @work

Now everything should be in place and you would like to see ArgoCD in action. While doing so and following the below route, keep these things in mind:

- You are in the right GIT folder -> gpx-viewer
- You copy a gpx track and commit it to GIT
- Remember removing this file once you saw ArgoCD @work

```
# Make sure you are in the right directory and GIT is working

$ pwd
.../gpx-viewer

$ git status
Your branch is up to date with 'origin/main'.

# You want to add some new gpx route to your "repository"
$ cp public/new_routes/Bonames-Nidda.gpx public/gpx/.

# You want to commit this change to GIT
$ git add . ; git commit -m "test it" ; git push
```

What you did is that you have a new gpx file in your GIT repository. And as ArgoCD is watching your GIT repo it should show a new status.

