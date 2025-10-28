import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../hooks/useGameState';
import { useKeyboard } from '../hooks/useKeyboard';
import { useGameLoop } from '../hooks/useGameLoop';
import { GameBoard } from '../components/game/GameBoard';
import { GameHUD } from '../components/game/GameHUD';
import { GameOverModal } from '../components/game/GameOverModal';

export const GamePage = () => {
  const navigate = useNavigate();
  
  const {
    gameState,
    pacmanState,
    ghostStates,
    maze,
    initializeGame,
    pauseGame,
    setPacmanDirection,
    updatePacmanPosition,
    updatePacmanDirection,
    eatPellet,
    loseLife,
    updatePowerPelletTimer,
  } = useGameState();

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Keyboard controls
  useKeyboard({
    onDirectionChange: setPacmanDirection,
    onPause: pauseGame,
    isGameActive: gameState.status === 'PLAYING' || gameState.status === 'PAUSED',
  });

  // Game loop
  useGameLoop({
    gameStatus: gameState.status,
    pacmanState,
    ghostStates,
    maze,
    updatePacmanPosition,
    updatePacmanDirection,
    eatPellet,
    loseLife,
    updatePowerPelletTimer,
  });

  const handleRestart = () => {
    initializeGame();
  };

  const handleBackToMenu = () => {
    navigate('/');
  };

  // Handle game state changes
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState.status === 'GAME_OVER' || gameState.status === 'VICTORY') {
        if (event.code === 'Space') {
          event.preventDefault();
          handleRestart();
        } else if (event.code === 'Escape') {
          event.preventDefault();
          handleBackToMenu();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.status]);

  const isNewHighScore = gameState.score > 0 && gameState.score === gameState.highScore;

  return (
    <div className="min-h-screen bg-black text-white">
      <GameHUD gameState={gameState} />
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
        {gameState.status === 'MENU' ? (
          <div className="text-center">
            <div className="text-2xl text-yellow-400 mb-4">Loading Game...</div>
            <div className="text-sm text-gray-400">Press arrow keys to move, SPACE to pause</div>
          </div>
        ) : (
          <GameBoard
            maze={maze}
            pacmanState={pacmanState}
            ghostStates={ghostStates}
            powerPelletActive={gameState.powerPelletActive}
          />
        )}
        
        {gameState.status === 'PLAYING' && (
          <div className="mt-4 text-center text-sm text-gray-400">
            <div>Use arrow keys to move • SPACE to pause</div>
            <div>Eat all pellets to advance to the next level!</div>
          </div>
        )}
        
        {gameState.status === 'VICTORY' && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-4xl text-yellow-400 font-bold animate-pulse">
                LEVEL COMPLETE!
              </div>
              <div className="text-xl text-white">
                Score: {gameState.score.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">
                Press SPACE for next level or ESC for menu
              </div>
            </div>
          </div>
        )}
      </div>
      
      <GameOverModal
        isOpen={gameState.status === 'GAME_OVER'}
        score={gameState.score}
        highScore={gameState.highScore}
        level={gameState.level}
        isNewHighScore={isNewHighScore}
        onRestart={handleRestart}
        onBackToMenu={handleBackToMenu}
      />
    </div>
  );
};