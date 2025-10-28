#!/bin/bash

# Script to convert project from pnpm to npm
echo "🔄 Converting project from pnpm to npm..."

# Remove pnpm lock file if it exists
if [ -f "pnpm-lock.yaml" ]; then
    echo "📝 Removing pnpm-lock.yaml..."
    rm pnpm-lock.yaml
fi

# Install dependencies with npm
echo "📦 Installing dependencies with npm..."
npm install

echo "✅ Project successfully converted to use npm!"
echo "🚀 You can now run: npm run dev"