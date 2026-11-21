#!/usr/bin/env bash
# Builds the site's image here, pushes it to ghcr.io and asks Coolify on poseidon to run it
# (see olympus DEPLOY.md). Built locally rather than in GitHub Actions: the site is small.
# Needs: docker logged in to ghcr.io with write:packages
#   (gh auth token | docker login ghcr.io -u EdgarBarrantes --password-stdin),
# and a Coolify API token in ~/.config/poseidon/coolify-api-token.
set -euo pipefail
cd "$(dirname "$0")/.."

IMAGE=ghcr.io/edgarbarrantes/edgar.barrantes.dev
APP=ik3jpvwgm0vhjwzfw0socvmr   # Coolify application "site" in project "edgar"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Commit first: the image is tagged with the commit." >&2; exit 1
fi
SHA=$(git rev-parse HEAD)

docker build --build-arg GIT_COMMIT="$SHA" -t "$IMAGE:$SHA" -t "$IMAGE:latest" .
docker push "$IMAGE:$SHA"
docker push "$IMAGE:latest"

# Token from the file via a header file on stdin, so it never shows in the process list.
curl --fail --silent --show-error --max-time 60 --request POST -A deploy-script -H @- \
  "https://deploy.barrantes.dev/api/v1/deploy?uuid=$APP" \
  <<< "Authorization: Bearer $(cat ~/.config/poseidon/coolify-api-token)"
echo
echo "Deploying $SHA; Coolify's log: https://deploy.barrantes.dev"
