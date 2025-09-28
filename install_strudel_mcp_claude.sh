#!/bin/bash

# Install remote Strudel MCP server

set -e

echo "🔧 Installing REMOTE Strudel MCP server..."

echo "🗑️ Removing existing strudelMcp server..."
claude mcp remove strudelMcp 2>/dev/null || echo "  (strudelMcp not found - skipping)"

echo "⚙️ Adding REMOTE SSE server..."
claude mcp add --transport sse strudelMcp https://strudel-llm.mcp.mathplosion.com/sse

echo ""
echo "🎉 Remote installation complete!"
echo "📍 Server URL: https://strudel-llm.mcp.mathplosion.com/sse"
echo ""
echo "💡 Lets run claude mcp list"
claude mcp list
