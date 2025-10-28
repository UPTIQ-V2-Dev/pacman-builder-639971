import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal = ({ isOpen, onClose }: InstructionsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-black text-white border-yellow-400 border-2">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 text-2xl text-center">
            HOW TO PLAY PAC-MAN
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-yellow-400 text-lg font-bold">OBJECTIVE</h3>
              <p className="text-sm">
                Navigate Pac-Man through the maze to eat all pellets while avoiding ghosts.
                Clear all pellets to advance to the next level!
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-yellow-400 text-lg font-bold">CONTROLS</h3>
              <div className="text-sm space-y-1">
                <p>↑ Arrow Key - Move Up</p>
                <p>↓ Arrow Key - Move Down</p>
                <p>← Arrow Key - Move Left</p>
                <p>→ Arrow Key - Move Right</p>
                <p>SPACEBAR - Pause Game</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-yellow-400 text-lg font-bold">SCORING</h3>
              <div className="text-sm space-y-1">
                <p>Small Pellet: 10 points</p>
                <p>Power Pellet: 50 points</p>
                <p>Ghost (when blue): 200+ points</p>
                <p>Bonus points for completing levels</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-yellow-400 text-lg font-bold">POWER PELLETS</h3>
              <p className="text-sm">
                Eat large pellets to turn ghosts blue and vulnerable.
                Chase and eat them for bonus points!
                Effect lasts 10 seconds.
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-yellow-400">
            <h3 className="text-yellow-400 text-lg font-bold mb-2">THE GHOSTS</h3>
            <div className="flex justify-center gap-8 text-sm">
              <div className="text-center">
                <div className="text-red-400 text-2xl">👻</div>
                <p>BLINKY</p>
                <p className="text-xs text-gray-400">Chases directly</p>
              </div>
              <div className="text-center">
                <div className="text-pink-400 text-2xl">👻</div>
                <p>PINKY</p>
                <p className="text-xs text-gray-400">Ambushes ahead</p>
              </div>
              <div className="text-center">
                <div className="text-cyan-400 text-2xl">👻</div>
                <p>INKY</p>
                <p className="text-xs text-gray-400">Unpredictable</p>
              </div>
              <div className="text-center">
                <div className="text-orange-400 text-2xl">👻</div>
                <p>CLYDE</p>
                <p className="text-xs text-gray-400">Shy pursuer</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onClose}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-2"
          >
            GOT IT!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};