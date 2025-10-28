import type { Position, GameSettings } from '../types/game';

export const GAME_CONFIG = {
  BOARD_WIDTH: 19,
  BOARD_HEIGHT: 21,
  CELL_SIZE: 24,
  FPS: 60,
  FRAME_DURATION: 1000 / 60,
} as const;

export const SPEEDS = {
  PACMAN: 2,
  GHOST_NORMAL: 1.8,
  GHOST_FRIGHTENED: 1,
  GHOST_EATEN: 4,
} as const;

export const SCORES = {
  PELLET: 10,
  POWER_PELLET: 50,
  GHOST_BASE: 200,
  FRUIT: 100,
  LEVEL_COMPLETE: 1000,
} as const;

export const TIMERS = {
  POWER_PELLET_DURATION: 10000, // 10 seconds
  GHOST_MODE_SWITCH: 7000, // 7 seconds
  FRIGHTENED_WARNING: 2000, // 2 seconds before end
} as const;

export const GHOST_COLORS = {
  BLINKY: '#FF0000', // Red
  PINKY: '#FFB8FF', // Pink
  INKY: '#00FFFF', // Cyan
  CLYDE: '#FFB852', // Orange
} as const;

export const GHOST_NAMES = ['BLINKY', 'PINKY', 'INKY', 'CLYDE'] as const;

export const INITIAL_POSITIONS: Record<string, Position> = {
  PACMAN: { x: 9, y: 15 },
  BLINKY: { x: 9, y: 9 },
  PINKY: { x: 9, y: 10 },
  INKY: { x: 8, y: 10 },
  CLYDE: { x: 10, y: 10 },
} as const;

export const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  musicEnabled: true,
  volume: 0.7,
  difficulty: 'MEDIUM',
  controls: {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    pause: 'Space',
  },
};

export const MAZE_LAYOUT = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 0, 0, 4, 0, 0, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 1, 0, 4, 4, 4, 0, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 2, 0, 0, 4, 4, 4, 0, 0, 2, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 1, 0, 4, 4, 4, 0, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 3, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 3, 1],
  [1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Legend:
// 0 = Empty space (no pellet)
// 1 = Wall
// 2 = Pellet
// 3 = Power pellet
// 4 = Ghost house