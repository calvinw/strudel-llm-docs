#!/bin/bash

set -e

echo "Installing skillshare CLI..."
curl -fsSL https://raw.githubusercontent.com/runkids/skillshare/main/install.sh | sh

echo ""
echo "Syncing skills to AI tools..."
skillshare sync

echo ""
echo "Done! Skills are now available in Claude Code, OpenCode, and other configured tools."
echo "Try /anchor-framework or /syncopations in your AI tool."
