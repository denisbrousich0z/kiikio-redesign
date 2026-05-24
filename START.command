#!/usr/bin/env bash
# Kiikio — After the Storm — local launcher (macOS / Linux)
# Double-click this file to start the prototype on http://localhost:3000

set -e
cd "$(dirname "$0")/prototype"

echo ""
echo "============================================"
echo "  KIIKIO — AFTER THE STORM"
echo "  Local prototype launcher"
echo "============================================"
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "[!] Node.js is not installed."
  echo "    Install Node 18+ from https://nodejs.org/ and try again."
  read -p "Press Enter to close..."
  exit 1
fi

NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "[!] Node.js $NODE_MAJOR is too old. Need Node 18 or newer."
  echo "    Upgrade from https://nodejs.org/ and try again."
  read -p "Press Enter to close..."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "[1/2] Installing dependencies (first run, ~1-2 min)..."
  npm install
else
  echo "[1/2] Dependencies already installed."
fi

echo ""
echo "[2/2] Starting dev server..."
echo ""
echo "  Open http://localhost:3000 in your browser."
echo "  Press Ctrl+C in this terminal to stop the server."
echo ""

npm run dev
