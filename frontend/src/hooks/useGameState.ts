import { useState, useCallback } from 'react';
import type { GameState, PacmanState, GhostState, Cell, Direction } from '../types/game';
import { 
  INITIAL_POSITIONS, 
  GHOST_NAMES, 
  GHOST_COLORS, 
  SPEEDS 
} from '../utils/gameConstants';
import { initializeMaze, countPellets } from '../utils/gameUtils';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: 'MENU',
    score: 0,
    lives: 3,
    level: 1,
    pelletsRemaining: 0,
    powerPelletActive: false,
    powerPelletTimer: 0,
    highScore: parseInt(localStorage.getItem('pacman-high-score') || '0', 10),
  });

  const [pacmanState, setPacmanState] = useState<PacmanState>({
    position: { ...INITIAL_POSITIONS.PACMAN },
    direction: 'RIGHT',
    nextDirection: 'RIGHT',
    isMoving: false,
    speed: SPEEDS.PACMAN,
  });

  const [ghostStates, setGhostStates] = useState<GhostState[]>(() =>
    GHOST_NAMES.map((name, index) => ({
      id: name.toLowerCase(),
      name,
      position: { ...INITIAL_POSITIONS[name] },
      direction: 'UP',
      mode: 'SCATTER',
      targetPosition: { ...INITIAL_POSITIONS[name] },
      homePosition: { ...INITIAL_POSITIONS[name] },
      color: GHOST_COLORS[name as keyof typeof GHOST_COLORS],
      speed: SPEEDS.GHOST_NORMAL,
      isVisible: true,
    }))
  );

  const [maze, setMaze] = useState<Cell[][]>(() => {
    const initialMaze = initializeMaze();
    return initialMaze;
  });

  const initializeGame = useCallback(() => {
    const newMaze = initializeMaze();
    const pelletsCount = countPellets(newMaze);
    
    setGameState(prev => ({
      ...prev,
      status: 'PLAYING',
      score: 0,
      lives: 3,
      level: 1,
      pelletsRemaining: pelletsCount,
      powerPelletActive: false,
      powerPelletTimer: 0,
    }));

    setPacmanState({
      position: { ...INITIAL_POSITIONS.PACMAN },
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
      isMoving: false,
      speed: SPEEDS.PACMAN,
    });

    setGhostStates(GHOST_NAMES.map((name) => ({
      id: name.toLowerCase(),
      name,
      position: { ...INITIAL_POSITIONS[name] },
      direction: 'UP',
      mode: 'SCATTER',
      targetPosition: { ...INITIAL_POSITIONS[name] },
      homePosition: { ...INITIAL_POSITIONS[name] },
      color: GHOST_COLORS[name as keyof typeof GHOST_COLORS],
      speed: SPEEDS.GHOST_NORMAL,
      isVisible: true,
    })));

    setMaze(newMaze);
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: prev.status === 'PLAYING' ? 'PAUSED' : 'PLAYING',
    }));
  }, []);

  const gameOver = useCallback(() => {
    setGameState(prev => {
      const newHighScore = Math.max(prev.score, prev.highScore);
      if (newHighScore > prev.highScore) {
        localStorage.setItem('pacman-high-score', newHighScore.toString());
      }
      
      return {
        ...prev,
        status: 'GAME_OVER',
        highScore: newHighScore,
      };
    });
  }, []);

  const updateScore = useCallback((points: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
    }));
  }, []);

  const setPacmanDirection = useCallback((direction: Direction) => {
    setPacmanState(prev => ({
      ...prev,
      nextDirection: direction,
    }));
  }, []);

  const updatePacmanPosition = useCallback((position: { x: number; y: number }) => {
    setPacmanState(prev => ({
      ...prev,
      position,
      isMoving: true,
    }));
  }, []);

  const updatePacmanDirection = useCallback((direction: Direction) => {
    setPacmanState(prev => ({
      ...prev,
      direction,
    }));
  }, []);

  const eatPellet = useCallback((x: number, y: number) => {
    setMaze(prev => {
      const newMaze = [...prev];
      const cell = newMaze[y][x];
      
      if (cell.hasPellet) {
        cell.hasPellet = false;
        updateScore(10);
      } else if (cell.hasPowerPellet) {
        cell.hasPowerPellet = false;
        updateScore(50);
        setGameState(gameState => ({
          ...gameState,
          powerPelletActive: true,
          powerPelletTimer: 10000, // 10 seconds
        }));
      }
      
      return newMaze;
    });

    setGameState(prev => {
      const newPelletsRemaining = prev.pelletsRemaining - 1;
      if (newPelletsRemaining <= 0) {
        return {
          ...prev,
          pelletsRemaining: 0,
          status: 'VICTORY',
        };
      }
      return {
        ...prev,
        pelletsRemaining: newPelletsRemaining,
      };
    });
  }, [updateScore]);

  const loseLife = useCallback(() => {
    setGameState(prev => {
      const newLives = prev.lives - 1;
      if (newLives <= 0) {
        return {
          ...prev,
          lives: 0,
          status: 'GAME_OVER',
        };
      }
      return {
        ...prev,
        lives: newLives,
      };
    });

    // Reset positions
    setPacmanState(prev => ({
      ...prev,
      position: { ...INITIAL_POSITIONS.PACMAN },
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
    }));

    setGhostStates(prev => prev.map(ghost => ({
      ...ghost,
      position: { ...INITIAL_POSITIONS[ghost.name as keyof typeof INITIAL_POSITIONS] },
      direction: 'UP',
      mode: 'SCATTER',
    })));
  }, []);

  const updatePowerPelletTimer = useCallback((deltaTime: number) => {
    setGameState(prev => {
      if (prev.powerPelletActive && prev.powerPelletTimer > 0) {
        const newTimer = prev.powerPelletTimer - deltaTime;
        if (newTimer <= 0) {
          return {
            ...prev,
            powerPelletActive: false,
            powerPelletTimer: 0,
          };
        }
        return {
          ...prev,
          powerPelletTimer: newTimer,
        };
      }
      return prev;
    });
  }, []);

  return {
    gameState,
    pacmanState,
    ghostStates,
    maze,
    setGameState,
    setPacmanState,
    setGhostStates,
    setMaze,
    initializeGame,
    pauseGame,
    gameOver,
    updateScore,
    setPacmanDirection,
    updatePacmanPosition,
    updatePacmanDirection,
    eatPellet,
    loseLife,
    updatePowerPelletTimer,
  };
};