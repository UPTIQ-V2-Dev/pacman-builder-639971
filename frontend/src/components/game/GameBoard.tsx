import type { Cell, PacmanState, GhostState } from '../../types/game';
import { GAME_CONFIG } from '../../utils/gameConstants';
import { Pacman } from './Pacman';
import { Ghost } from './Ghost';

interface GameBoardProps {
  maze: Cell[][];
  pacmanState: PacmanState;
  ghostStates: GhostState[];
  powerPelletActive: boolean;
}

export const GameBoard = ({ maze, pacmanState, ghostStates, powerPelletActive }: GameBoardProps) => {
  const boardWidth = GAME_CONFIG.BOARD_WIDTH * GAME_CONFIG.CELL_SIZE;
  const boardHeight = GAME_CONFIG.BOARD_HEIGHT * GAME_CONFIG.CELL_SIZE;

  const renderCell = (cell: Cell, x: number, y: number) => {
    const pixelX = x * GAME_CONFIG.CELL_SIZE;
    const pixelY = y * GAME_CONFIG.CELL_SIZE;

    let cellContent = null;
    let cellClass = '';

    switch (cell.type) {
      case 'WALL':
        cellClass = 'bg-blue-600 border border-blue-400';
        break;
      case 'EMPTY':
      case 'GHOST_HOUSE':
        cellClass = 'bg-black';
        break;
      case 'PELLET':
      default:
        cellClass = 'bg-black';
        break;
    }

    if (cell.hasPellet) {
      cellContent = (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-1 h-1 bg-yellow-300 rounded-full"></div>
        </div>
      );
    } else if (cell.hasPowerPellet) {
      cellContent = (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
        </div>
      );
    }

    return (
      <div
        key={`${x}-${y}`}
        className={`absolute ${cellClass}`}
        style={{
          left: `${pixelX}px`,
          top: `${pixelY}px`,
          width: `${GAME_CONFIG.CELL_SIZE}px`,
          height: `${GAME_CONFIG.CELL_SIZE}px`,
        }}
      >
        {cellContent}
      </div>
    );
  };

  return (
    <div className="flex justify-center p-4 bg-black">
      <div 
        className="relative border-4 border-blue-600 bg-black"
        style={{
          width: `${boardWidth}px`,
          height: `${boardHeight}px`,
        }}
      >
        {/* Render maze cells */}
        {maze.map((row, y) =>
          row.map((cell, x) => renderCell(cell, x, y))
        )}
        
        {/* Render Pacman */}
        <Pacman pacmanState={pacmanState} />
        
        {/* Render Ghosts */}
        {ghostStates.map((ghost) => (
          <Ghost 
            key={ghost.id} 
            ghostState={ghost} 
            powerPelletActive={powerPelletActive}
          />
        ))}
      </div>
    </div>
  );
};