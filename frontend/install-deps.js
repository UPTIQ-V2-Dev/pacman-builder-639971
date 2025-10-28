#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to run command with error handling
function runCommand(command, description) {
  try {
    console.log(`Running: ${description}`);
    execSync(command, { stdio: 'inherit', cwd: __dirname });
    console.log(`✅ ${description} completed successfully`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return false;
  }
}

// Check if pnpm is available
function checkPnpm() {
  try {
    execSync('pnpm --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

// Main installation function
function installDependencies() {
  console.log('🚀 Starting dependency installation...');
  
  // Remove lock files if they exist
  const lockFiles = ['pnpm-lock.yaml', 'package-lock.json', 'yarn.lock'];
  lockFiles.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
      try {
        fs.unlinkSync(path.join(__dirname, file));
        console.log(`Removed ${file}`);
      } catch (error) {
        console.warn(`Could not remove ${file}:`, error.message);
      }
    }
  });
  
  // Try to enable corepack and install pnpm
  console.log('🔧 Attempting to enable corepack and install pnpm...');
  if (runCommand('corepack enable', 'Enable corepack')) {
    if (runCommand('corepack prepare pnpm@latest --activate', 'Install pnpm via corepack')) {
      if (checkPnpm()) {
        console.log('✅ pnpm is now available');
        return runCommand('pnpm install', 'Install dependencies with pnpm');
      }
    }
  }
  
  // Fallback to npm if pnpm is not available
  console.log('📦 pnpm not available, falling back to npm...');
  return runCommand('npm install', 'Install dependencies with npm');
}

// Run the installation
const success = installDependencies();

if (success) {
  console.log('🎉 Dependencies installed successfully!');
  process.exit(0);
} else {
  console.error('💥 Failed to install dependencies');
  process.exit(1);
}