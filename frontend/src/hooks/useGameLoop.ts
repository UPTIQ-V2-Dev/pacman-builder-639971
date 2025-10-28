import { useEffect, useRef, useCallback } from 'react';
import type { PacmanState, GhostState, Cell, Direction } from '../types/game';
import { 
  getNextPosition, 
  canMoveTo, 
  isPositionEqual,
  getValidDirections 
} from '../utils/gameUtils';
import { GAME_CONFIG } from '../utils/gameConstants';

interface UseGameLoopProps {
  gameStatus: string;
  pacmanState: PacmanState;
  ghostStates: GhostState[];
  maze: Cell[][];
  updatePacmanPosition: (position: { x: number; y: number }) => void;
  updatePacmanDirection: (direction: Direction) => void;
  eatPellet: (x: number, y: number) => void;
  loseLife: () => void;
  updatePowerPelletTimer: (deltaTime: number) => void;
}

export const useGameLoop = ({
  gameStatus,
  pacmanState,
  ghostStates,
  maze,
  updatePacmanPosition,
  updatePacmanDirection,
  eatPellet,
  loseLife,
  updatePowerPelletTimer,
}: UseGameLoopProps) => {
  const animationFrameId = useRef<number | null>(null);
  const lastTimestamp = useRef<number>(0);
  const accumulator = useRef<number>(0);

  const updatePacman = useCallback((deltaTime: number) => {
    if (gameStatus !== 'PLAYING') return;

    const frameTime = GAME_CONFIG.FRAME_DURATION;
    accumulator.current += deltaTime;

    while (accumulator.current >= frameTime) {
      // Try to change direction if a new direction was requested
      if (pacmanState.nextDirection !== pacmanState.direction) {
        const nextPos = getNextPosition(pacmanState.position, pacmanState.nextDirection);
        if (canMoveTo(nextPos)) {
          updatePacmanDirection(pacmanState.nextDirection);
        }
      }

      // Move Pacman in current direction
      const nextPos = getNextPosition(pacmanState.position, pacmanState.direction);
      if (canMoveTo(nextPos)) {
        updatePacmanPosition(nextPos);
        
        // Check for pellet collection
        const cell = maze[nextPos.y]?.[nextPos.x];
        if (cell && (cell.hasPellet || cell.hasPowerPellet)) {
          eatPellet(nextPos.x, nextPos.y);
        }
      }

      accumulator.current -= frameTime;
    }
  }, [
    gameStatus,
    pacmanState,
    maze,
    updatePacmanPosition,
    updatePacmanDirection,
    eatPellet
  ]);

  const checkCollisions = useCallback(() => {
    if (gameStatus !== 'PLAYING') return;

    // Check Pacman-Ghost collisions
    for (const ghost of ghostStates) {
      if (isPositionEqual(pacmanState.position, ghost.position)) {
        if (ghost.mode === 'FRIGHTENED') {
          // TODO: Eat ghost (implement in next phase)
          console.log('Ghost eaten!');
        } else {
          loseLife();
          return;
        }
      }
    }
  }, [gameStatus, pacmanState.position, ghostStates, loseLife]);

  const gameLoop = useCallback((timestamp: number) => {
    if (lastTimestamp.current === 0) {
      lastTimestamp.current = timestamp;
    }

    const deltaTime = timestamp - lastTimestamp.current;
    lastTimestamp.current = timestamp;

    if (gameStatus === 'PLAYING') {
      updatePacman(deltaTime);
      updatePowerPelletTimer(deltaTime);
      checkCollisions();
    }

    animationFrameId.current = requestAnimationFrame(gameLoop);
  }, [gameStatus, updatePacman, updatePowerPelletTimer, checkCollisions]);

  useEffect(() => {
    if (gameStatus === 'PLAYING') {
      lastTimestamp.current = 0;
      accumulator.current = 0;
      animationFrameId.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameStatus, gameLoop]);

  return null;
};