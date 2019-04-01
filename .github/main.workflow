workflow "publish release to npm" {
  on = "release"
  resolves = ["publish"]
}

action "publish" {
  uses = "actions/npm@v2.0.0"
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
