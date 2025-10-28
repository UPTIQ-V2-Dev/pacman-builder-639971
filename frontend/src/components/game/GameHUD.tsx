import type { GameState } from '../../types/game';
import { formatScore } from '../../utils/gameUtils';

interface GameHUDProps {
  gameState: GameState;
}

export const GameHUD = ({ gameState }: GameHUDProps) => {
  const renderLives = () => {
    return Array.from({ length: gameState.lives }, (_, index) => (
      <span key={index} className="text-yellow-400 text-xl">🟡</span>
    ));
  };

  return (
    <div className="bg-black text-white p-4 border-b-2 border-blue-600">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-xs text-gray-400">SCORE</div>
            <div className="text-xl font-bold text-yellow-400">
              {formatScore(gameState.score)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-gray-400">HIGH SCORE</div>
            <div className="text-xl font-bold text-yellow-400">
              {formatScore(gameState.highScore)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-gray-400">LEVEL</div>
            <div className="text-xl font-bold text-white">
              {gameState.level}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-xs text-gray-400">PELLETS</div>
            <div className="text-xl font-bold text-white">
              {gameState.pelletsRemaining}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-gray-400">LIVES</div>
            <div className="flex gap-1">
              {renderLives()}
            </div>
          </div>
          
          {gameState.powerPelletActive && (
            <div className="text-center">
              <div className="text-xs text-gray-400">POWER</div>
              <div className="text-xl font-bold text-cyan-400">
                {Math.ceil(gameState.powerPelletTimer / 1000)}s
              </div>
            </div>
          )}
        </div>
      </div>
      
      {gameState.status === 'PAUSED' && (
        <div className="text-center mt-2">
          <div className="text-yellow-400 text-lg font-bold animate-pulse">
            GAME PAUSED - Press SPACE to continue
          </div>
        </div>
      )}
    </div>
  );
};