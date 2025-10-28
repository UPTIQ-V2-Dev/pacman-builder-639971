export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type GameStatus = 'MENU' | 'PLAYING' | 'PAUSED' | 'GAME_OVER' | 'VICTORY';
export type GhostMode = 'CHASE' | 'SCATTER' | 'FRIGHTENED' | 'EATEN';

export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  status: GameStatus;
  score: number;
  lives: number;
  level: number;
  pelletsRemaining: number;
  powerPelletActive: boolean;
  powerPelletTimer: number;
  highScore: number;
}

export interface PacmanState {
  position: Position;
  direction: Direction;
  nextDirection: Direction;
  isMoving: boolean;
  speed: number;
}

export interface GhostState {
  id: string;
  name: string;
  position: Position;
  direction: Direction;
  mode: GhostMode;
  targetPosition: Position;
  homePosition: Position;
  color: string;
  speed: number;
  isVisible: boolean;
}

export interface Cell {
  x: number;
  y: number;
  type: CellType;
  hasPellet: boolean;
  hasPowerPellet: boolean;
}

export type CellType = 'WALL' | 'EMPTY' | 'PELLET' | 'POWER_PELLET' | 'GHOST_HOUSE' | 'TUNNEL';

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  controls: {
    up: string;
    down: string;
    left: string;
    right: string;
    pause: string;
  };
}

export interface HighScore {
  id: string;
  playerName: string;
  score: number;
  level: number;
  date: string;
}

export interface GameStats {
  gamesPlayed: number;
  totalScore: number;
  highestLevel: number;
  totalPelletsEaten: number;
  totalGhostsEaten: number;
  averageScore: number;
}