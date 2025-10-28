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
  
  // Only remove conflicting lock files, keep package-lock.json
  const lockFilesToRemove = ['pnpm-lock.yaml', 'yarn.lock'];
  lockFilesToRemove.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
      try {
        fs.unlinkSync(path.join(__dirname, file));
        console.log(`Removed ${file}`);
      } catch (error) {
        console.warn(`Could not remove ${file}:`, error.message);
      }
    }
  });
  
  // Use npm directly (no longer trying pnpm first)
  console.log('📦 Using npm for dependency installation...');
  return runCommand('npm install', 'Install dependencies with npm');
}

// Run the installation
const success = installDependencies();

if (success) {
  console.log('🎉 Dependencies installed successfully with npm!');
  process.exit(0);
} else {
  console.error('💥 Failed to install dependencies');
  console.error('💡 You can try running: npm install');
  process.exit(1);
}