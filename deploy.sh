#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="/var/www/bunny-platformer"
REPO_DIR="$APP_ROOT/repo"
SITE_DIR="$APP_ROOT/site"

if [ ! -d "$REPO_DIR" ]; then
  echo "Repo directory not found: $REPO_DIR"
  exit 1
fi

cd "$REPO_DIR"
npm install
npm run build
mkdir -p "$SITE_DIR"
rm -rf "$SITE_DIR"/*
cp -R dist/. "$SITE_DIR"/

echo "Deploy complete. Files copied to $SITE_DIR"
