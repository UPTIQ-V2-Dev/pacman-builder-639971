import type { GhostState } from '../../types/game';
import { GAME_CONFIG } from '../../utils/gameConstants';

interface GhostProps {
  ghostState: GhostState;
  powerPelletActive: boolean;
}

export const Ghost = ({ ghostState, powerPelletActive }: GhostProps) => {
  const { position, name, mode } = ghostState;
  
  const pixelX = position.x * GAME_CONFIG.CELL_SIZE;
  const pixelY = position.y * GAME_CONFIG.CELL_SIZE;

  const getGhostColor = () => {
    if (mode === 'FRIGHTENED' && powerPelletActive) {
      return 'text-blue-400';
    }
    
    switch (name) {
      case 'BLINKY': return 'text-red-500';
      case 'PINKY': return 'text-pink-400';
      case 'INKY': return 'text-cyan-400';
      case 'CLYDE': return 'text-orange-400';
      default: return 'text-white';
    }
  };

  const getGhostEmoji = () => {
    if (mode === 'FRIGHTENED' && powerPelletActive) {
      return '😨';
    }
    return '👻';
  };

  const getAnimation = () => {
    if (mode === 'FRIGHTENED' && powerPelletActive) {
      return 'animate-bounce';
    }
    return 'animate-pulse';
  };

  return (
    <div
      className="absolute transition-all duration-200"
      style={{
        left: `${pixelX}px`,
        top: `${pixelY}px`,
        width: `${GAME_CONFIG.CELL_SIZE}px`,
        height: `${GAME_CONFIG.CELL_SIZE}px`,
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className={`text-xl ${getGhostColor()} ${getAnimation()}`}>
          {getGhostEmoji()}
        </div>
      </div>
    </div>
  );
};