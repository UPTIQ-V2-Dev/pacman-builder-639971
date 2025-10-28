import type { PacmanState } from '../../types/game';
import { GAME_CONFIG } from '../../utils/gameConstants';

interface PacmanProps {
  pacmanState: PacmanState;
}

export const Pacman = ({ pacmanState }: PacmanProps) => {
  const { position, direction } = pacmanState;
  
  const getRotation = () => {
    switch (direction) {
      case 'RIGHT': return 'rotate-0';
      case 'DOWN': return 'rotate-90';
      case 'LEFT': return 'rotate-180';
      case 'UP': return 'rotate-270';
      default: return 'rotate-0';
    }
  };

  const pixelX = position.x * GAME_CONFIG.CELL_SIZE;
  const pixelY = position.y * GAME_CONFIG.CELL_SIZE;

  return (
    <div
      className={`absolute transition-all duration-100 ${getRotation()}`}
      style={{
        left: `${pixelX}px`,
        top: `${pixelY}px`,
        width: `${GAME_CONFIG.CELL_SIZE}px`,
        height: `${GAME_CONFIG.CELL_SIZE}px`,
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-yellow-400 text-xl animate-pulse">
          🟡
        </div>
      </div>
    </div>
  );
};