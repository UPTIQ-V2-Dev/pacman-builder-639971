import type { Position, Direction, Cell, CellType } from '../types/game';
import { GAME_CONFIG, MAZE_LAYOUT } from './gameConstants';

export const getOppositeDirection = (direction: Direction): Direction => {
  const opposites: Record<Direction, Direction> = {
    UP: 'DOWN',
    DOWN: 'UP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT',
  };
  return opposites[direction];
};

export const getDirectionVector = (direction: Direction): Position => {
  const vectors: Record<Direction, Position> = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
  };
  return vectors[direction];
};

export const addPositions = (pos1: Position, pos2: Position): Position => ({
  x: pos1.x + pos2.x,
  y: pos1.y + pos2.y,
});

export const subtractPositions = (pos1: Position, pos2: Position): Position => ({
  x: pos1.x - pos2.x,
  y: pos1.y - pos2.y,
});

export const getDistance = (pos1: Position, pos2: Position): number => {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const getManhattanDistance = (pos1: Position, pos2: Position): number => {
  return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
};

export const isPositionEqual = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

export const isValidPosition = (position: Position): boolean => {
  return (
    position.x >= 0 &&
    position.x < GAME_CONFIG.BOARD_WIDTH &&
    position.y >= 0 &&
    position.y < GAME_CONFIG.BOARD_HEIGHT
  );
};

export const getCellType = (x: number, y: number): CellType => {
  if (!isValidPosition({ x, y })) return 'WALL';
  
  const cellValue = MAZE_LAYOUT[y][x];
  switch (cellValue) {
    case 0: return 'EMPTY';
    case 1: return 'WALL';
    case 2: return 'PELLET';
    case 3: return 'POWER_PELLET';
    case 4: return 'GHOST_HOUSE';
    default: return 'WALL';
  }
};

export const isWall = (x: number, y: number): boolean => {
  return getCellType(x, y) === 'WALL';
};

export const canMoveTo = (position: Position): boolean => {
  if (!isValidPosition(position)) return false;
  const cellType = getCellType(position.x, position.y);
  return cellType !== 'WALL';
};

export const getValidDirections = (position: Position): Direction[] => {
  const directions: Direction[] = [];
  const vectors: [Direction, Position][] = [
    ['UP', { x: 0, y: -1 }],
    ['DOWN', { x: 0, y: 1 }],
    ['LEFT', { x: -1, y: 0 }],
    ['RIGHT', { x: 1, y: 0 }],
  ];

  for (const [direction, vector] of vectors) {
    const newPos = addPositions(position, vector);
    if (canMoveTo(newPos)) {
      directions.push(direction);
    }
  }

  return directions;
};

export const wrapPosition = (position: Position): Position => {
  let { x, y } = position;
  
  // Handle horizontal tunnel wrapping
  if (x < 0) {
    x = GAME_CONFIG.BOARD_WIDTH - 1;
  } else if (x >= GAME_CONFIG.BOARD_WIDTH) {
    x = 0;
  }
  
  return { x, y };
};

export const getNextPosition = (position: Position, direction: Direction): Position => {
  const vector = getDirectionVector(direction);
  const newPosition = addPositions(position, vector);
  return wrapPosition(newPosition);
};

export const initializeMaze = (): Cell[][] => {
  const maze: Cell[][] = [];
  
  for (let y = 0; y < GAME_CONFIG.BOARD_HEIGHT; y++) {
    maze[y] = [];
    for (let x = 0; x < GAME_CONFIG.BOARD_WIDTH; x++) {
      const cellType = getCellType(x, y);
      maze[y][x] = {
        x,
        y,
        type: cellType,
        hasPellet: cellType === 'PELLET',
        hasPowerPellet: cellType === 'POWER_PELLET',
      };
    }
  }
  
  return maze;
};

export const countPellets = (maze: Cell[][]): number => {
  let count = 0;
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x].hasPellet || maze[y][x].hasPowerPellet) {
        count++;
      }
    }
  }
  return count;
};

export const formatScore = (score: number): string => {
  return score.toString().padStart(6, '0');
};

export const formatTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};