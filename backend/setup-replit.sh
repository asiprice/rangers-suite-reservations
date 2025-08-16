#!/bin/bash
# Replit setup script for native dependencies

echo "🔧 Setting up native dependencies for Replit..."

# Remove existing node_modules to force rebuild
echo "🗑️  Removing node_modules..."
rm -rf node_modules

# Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Install with rebuild for Linux
echo "📦 Installing dependencies for Linux..."
npm install

# Rebuild SQLite specifically for the current platform
echo "🔨 Rebuilding SQLite for Replit platform..."
npm rebuild sqlite3

echo "✅ Setup complete!"