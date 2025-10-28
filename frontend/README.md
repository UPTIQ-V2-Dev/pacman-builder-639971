# 🟡 Pacman Game

A classic Pacman game built with React 19, TypeScript, and Vite.

## 🎮 Features

- **Complete Pacman gameplay** with maze navigation
- **User authentication** with login/logout functionality
- **Responsive design** for desktop and mobile
- **Score tracking** with persistent high scores
- **Power pellets** with ghost vulnerability mode
- **Lives system** with game over mechanics
- **Pause/Resume** functionality
- **Modern UI** with Shadcn components and Tailwind CSS

## 🚀 Quick Start

### Setup and Run

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

### Alternative Setup

You can use the automated setup script for advanced dependency management:

```bash
# Automated dependency installation (tries pnpm, falls back to npm)
npm run setup
```

## 🎯 How to Play

- **Login**: Access the login page to authenticate (demo: user@example.com / password)
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
- `npm run setup` - Automated dependency installation

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