import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const SettingsPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="p-4 border-b border-blue-600">
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleBack}
            variant="ghost"
            className="text-white hover:text-yellow-400"
          >
            <ArrowLeft size={24} />
            Back to Menu
          </Button>
          <h1 className="text-2xl font-bold text-yellow-400">SETTINGS</h1>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl text-gray-600 mb-4">⚙️</div>
          <h2 className="text-3xl font-bold text-yellow-400">Coming Soon</h2>
          <p className="text-gray-400 max-w-md">
            Game settings will be available in a future update. 
            This will include sound controls, difficulty settings, and custom key bindings.
          </p>
          <Button 
            onClick={handleBack}
            className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3"
          >
            Back to Menu
          </Button>
        </div>
      </div>
    </div>
  );
};