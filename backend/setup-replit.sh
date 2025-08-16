#!/bin/bash
# Replit setup script for native dependencies

echo "🔧 Setting up native dependencies for Replit..."

# Set Python path for node-gyp
export PYTHON=/nix/store/*/bin/python3.11 || export PYTHON=/usr/bin/python3

# Remove existing node_modules to force rebuild
echo "🗑️  Removing node_modules..."
rm -rf node_modules package-lock.json

# Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Install with Python 3.11
echo "📦 Installing dependencies for Linux..."
npm install --python=$PYTHON

echo "✅ Setup complete!"