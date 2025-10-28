# Cleanup Notes

The following files can be safely removed as the project now uses npm instead of pnpm:

- `pnpm-lock.yaml` (pnpm lockfile - conflicts with npm)
- `.pnpmrc` (pnpm configuration)
- `pnpm` (pnpm wrapper script)
- `setup-pnpm.sh` (pnpm setup script)

The project has been reverted to use npm to resolve the "spawnSync pnpm ENOENT" error.
All Docker, entrypoint, and package.json configurations have been updated to use npm.