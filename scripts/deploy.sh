#!/usr/bin/env bash
# Builds the site's image here and runs it on poseidon (see olympus DEPLOY.md). No registry and no
# GitHub Actions: the image goes over SSH into poseidon's Docker, then the Coolify service's
# compose (deploy/compose.yml, image tag = the commit) is updated and the service restarted.
# Needs: `ssh poseidon` (passwordless sudo) and a Coolify API token in
# ~/.config/poseidon/coolify-api-token.
set -euo pipefail
cd "$(dirname "$0")/.."

SERVICE=rehvoruf98or6slkgiruyzc3   # Coolify service "site" in project "edgar"
API=https://deploy.barrantes.dev/api/v1

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Commit first: the image is tagged with the commit." >&2; exit 1
fi
TAG=$(git rev-parse --short=12 HEAD)

docker build --build-arg GIT_COMMIT="$(git rev-parse HEAD)" -t "edgar.barrantes.dev:$TAG" .
echo "Copying the image to poseidon..."
docker save "edgar.barrantes.dev:$TAG" | gzip -1 | ssh poseidon 'gunzip | sudo docker load'

# The token goes to curl as a header on stdin, so it never shows in the process list.
coolify() {
  curl --fail --silent --show-error --max-time 60 -A deploy-script -H @- \
    -H 'Content-Type: application/json' "$@" \
    <<< "Authorization: Bearer $(cat ~/.config/poseidon/coolify-api-token)"
}
compose=$(sed "s|edgar.barrantes.dev:TAG|edgar.barrantes.dev:$TAG|" deploy/compose.yml | base64 -w0)
coolify --request PATCH "$API/services/$SERVICE" \
  --data "$(jq -n --arg c "$compose" '{docker_compose_raw: $c}')" >/dev/null
coolify --request POST "$API/services/$SERVICE/restart" >/dev/null

echo "Restarting with $TAG; waiting for it to answer..."
for _ in $(seq 30); do
  if [[ "$(curl -s https://edgar.barrantes.dev/api/health -H 'Cache-Control: no-cache' -o /dev/null -w '%{http_code}')" == 200 ]] &&
     ssh poseidon "sudo docker ps --filter name=$SERVICE --format '{{.Image}} {{.Status}}'" | grep -q "$TAG.*healthy"; then
    echo "Live: https://edgar.barrantes.dev ($TAG)"
    # Keep the three newest images on poseidon for a quick rollback.
    ssh poseidon "sudo docker image ls edgar.barrantes.dev --format '{{.Tag}}' | tail -n +4 | sed 's/^/edgar.barrantes.dev:/' | xargs -r sudo docker image rm" >/dev/null || true
    exit 0
  fi
  sleep 5
done
echo "Not healthy after 150 s: check the service in Coolify (https://deploy.barrantes.dev)." >&2
exit 1
