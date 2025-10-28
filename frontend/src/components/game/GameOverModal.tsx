import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Trophy, RotateCcw, Home } from 'lucide-react';
import { formatScore } from '../../utils/gameUtils';

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  highScore: number;
  level: number;
  isNewHighScore: boolean;
  onRestart: () => void;
  onBackToMenu: () => void;
}

export const GameOverModal = ({
  isOpen,
  score,
  highScore,
  level,
  isNewHighScore,
  onRestart,
  onBackToMenu,
}: GameOverModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md bg-black text-white border-red-500 border-4">
        <DialogHeader>
          <DialogTitle className="text-red-500 text-3xl text-center font-bold">
            GAME OVER
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 text-center">
          <div className="space-y-4">
            <div className="text-2xl text-yellow-400 font-bold">
              FINAL SCORE
            </div>
            <div className="text-4xl text-white font-mono">
              {formatScore(score)}
            </div>
            
            {isNewHighScore && (
              <div className="text-yellow-400 font-bold animate-pulse flex items-center justify-center gap-2">
                <Trophy size={20} />
                NEW HIGH SCORE!
                <Trophy size={20} />
              </div>
            )}
            
            <div className="flex justify-between text-sm text-gray-400">
              <div>
                <div>Level Reached</div>
                <div className="text-white font-bold">{level}</div>
              </div>
              <div>
                <div>High Score</div>
                <div className="text-yellow-400 font-bold">{formatScore(highScore)}</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={onRestart}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 flex items-center gap-2"
            >
              <RotateCcw size={20} />
              PLAY AGAIN
            </Button>
            
            <Button 
              onClick={onBackToMenu}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 flex items-center gap-2"
            >
              <Home size={20} />
              MAIN MENU
            </Button>
          </div>
          
          <div className="text-xs text-gray-500">
            Press SPACE to play again or ESC for menu
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};