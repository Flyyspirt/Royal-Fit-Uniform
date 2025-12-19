#!/bin/bash
# Session start hook for Royal Fit Uniform project
# This script runs when a Claude Code session starts

echo "🎯 Royal Fit Uniform - Claude Code Session Starting..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
else
  echo "✅ Dependencies already installed"
fi

# Display project info
echo "📋 Project: Royal Fit Uniform (React + TypeScript + Vite)"
echo "🌿 Branch: $(git branch --show-current)"
echo "✨ Ready to develop!"
