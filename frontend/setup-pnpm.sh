#!/bin/bash

# Script to ensure project uses pnpm
echo "🔄 Setting up project for pnpm..."

# Remove npm lock file if it exists
if [ -f "package-lock.json" ]; then
    echo "📝 Removing package-lock.json..."
    rm package-lock.json
fi

# Ensure pnpm-lock.yaml exists and is up to date
echo "📦 Installing dependencies with pnpm..."
pnpm install

echo "✅ Project successfully configured to use pnpm!"
echo "🚀 You can now run: pnpm run dev"