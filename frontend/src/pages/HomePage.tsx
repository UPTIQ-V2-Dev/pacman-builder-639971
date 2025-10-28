import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLogo } from '../components/game/GameLogo';
import { MenuButton } from '../components/ui/menu-button';
import { InstructionsModal } from '../components/game/InstructionsModal';
import { Play, Trophy, Settings, HelpCircle, LogIn, LogOut } from 'lucide-react';
import { isAuthenticated, clearAuthData, getStoredUser } from '@/lib/api';

export const HomePage = () => {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);
  const authenticated = isAuthenticated();
  const user = getStoredUser();

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

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    clearAuthData();
    window.location.reload(); // Refresh to update auth state
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <GameLogo />
        
        {authenticated && user && (
          <div className="text-center text-yellow-400 text-sm">
            <p>Welcome back, {user.name || user.email}!</p>
          </div>
        )}
        
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
          
          {authenticated ? (
            <MenuButton 
              onClick={handleLogout}
              variant="secondary"
              className="flex items-center gap-3 bg-red-600 hover:bg-red-500 border-red-800"
            >
              <LogOut size={24} />
              LOGOUT
            </MenuButton>
          ) : (
            <MenuButton 
              onClick={handleLogin}
              variant="secondary"
              className="flex items-center gap-3"
            >
              <LogIn size={24} />
              LOGIN
            </MenuButton>
          )}
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