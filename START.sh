#!/usr/bin/env bash
# Kiikio — After the Storm — local launcher (Linux / macOS, terminal use)
# Run with:  bash START.sh

set -e
cd "$(dirname "$0")/prototype"

echo ""
echo "============================================"
echo "  KIIKIO — AFTER THE STORM"
echo "  Local prototype launcher"
echo "============================================"
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "[!] Node.js is not installed. Install Node 18+ from https://nodejs.org/"
  exit 1
fi

NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "[!] Node.js $NODE_MAJOR is too old. Need Node 18 or newer."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "[1/2] Installing dependencies (first run, ~1-2 min)..."
  npm install
else
  echo "[1/2] Dependencies already installed."
fi

echo ""
echo "[2/2] Starting dev server on http://localhost:3000"
echo "      Press Ctrl+C to stop."
echo ""
npm run dev
