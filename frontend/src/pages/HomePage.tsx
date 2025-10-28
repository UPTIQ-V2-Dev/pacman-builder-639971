import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLogo } from '../components/game/GameLogo';
import { MenuButton } from '../components/ui/menu-button';
import { InstructionsModal } from '../components/game/InstructionsModal';
import { Play, Trophy, Settings, HelpCircle } from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);

  const handleStartGame = () => {
    navigate('/game');
  };

  const handleHighScores = () => {
    navigate('/scores');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleInstructions = () => {
    setShowInstructions(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <GameLogo />
        
        <div className="space-y-4 flex flex-col items-center">
          <MenuButton 
            onClick={handleStartGame}
            variant="primary"
            className="flex items-center gap-3"
          >
            <Play size={24} />
            START GAME
          </MenuButton>
          
          <MenuButton 
            onClick={handleHighScores}
            variant="secondary"
            className="flex items-center gap-3"
          >
            <Trophy size={24} />
            HIGH SCORES
          </MenuButton>
          
          <MenuButton 
            onClick={handleSettings}
            variant="secondary"
            className="flex items-center gap-3"
          >
            <Settings size={24} />
            SETTINGS
          </MenuButton>
          
          <MenuButton 
            onClick={handleInstructions}
            variant="secondary"
            className="flex items-center gap-3"
          >
            <HelpCircle size={24} />
            HOW TO PLAY
          </MenuButton>
        </div>
        
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>© 2024 Pac-Man Game</p>
          <p>Use arrow keys to move, SPACEBAR to pause</p>
        </div>
      </div>
      
      <InstructionsModal 
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </div>
  );
};