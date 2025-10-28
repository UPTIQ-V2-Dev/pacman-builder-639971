# 🟡 Pacman Game

A classic Pacman game built with React 19, TypeScript, and Vite.

## 🎮 Features

- **Complete Pacman gameplay** with maze navigation
- **Responsive design** for desktop and mobile
- **Score tracking** with persistent high scores
- **Power pellets** with ghost vulnerability mode
- **Lives system** with game over mechanics
- **Pause/Resume** functionality
- **Modern UI** with Shadcn components and Tailwind CSS

## 🚀 Quick Start

### Using npm (recommended)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Package Manager Transition

This project has been converted from pnpm to npm for better compatibility. The following files have been updated:

- `Dockerfile` - Now uses npm instead of pnpm
- `entrypoint.preview.sh` - Updated all pnpm commands to npm
- `package-lock.json` - Added npm lockfile
- Removed `pnpm-lock.yaml`

## 🎯 How to Play

- **Movement**: Use arrow keys (↑↓←→) or WASD
- **Pause**: Press SPACEBAR
- **Objective**: Eat all pellets while avoiding ghosts
- **Power Pellets**: Large pellets make ghosts vulnerable for 10 seconds
- **Scoring**: 
  - Small pellet: 10 points
  - Power pellet: 50 points
  - Vulnerable ghost: 200+ points

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── game/           # Game-specific components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── data/               # Mock data
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run eslint` - Run ESLint
- `npm run prettier` - Format code
- `npm run test` - Run tests

## 🎨 Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **React Router** - Navigation
- **TanStack Query** - Data fetching

## 🐳 Docker Support

The project includes Docker support with automatic npm setup:

```bash
# Build image
docker build -t pacman-game .

# Run container
docker run -p 3000:3000 pacman-game
```

## 🔧 Environment Variables

- `VITE_USE_MOCK_DATA=true` - Use mock data instead of API calls

## 📝 Notes

- High scores are stored in localStorage
- Game uses 60 FPS animation loop
- Fully responsive design
- Supports both light and dark themes