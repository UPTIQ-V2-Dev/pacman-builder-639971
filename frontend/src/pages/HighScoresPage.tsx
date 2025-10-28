import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { gameService } from '../services/game';
import { Button } from '../components/ui/button';
import { ArrowLeft, Trophy, Calendar, Target } from 'lucide-react';
import { formatScore } from '../utils/gameUtils';

export const HighScoresPage = () => {
  const navigate = useNavigate();

  const { data: highScores = [], isLoading } = useQuery({
    queryKey: ['highScores'],
    queryFn: () => gameService.getHighScores(),
  });

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
          <h1 className="text-2xl font-bold text-yellow-400">HIGH SCORES</h1>
        </div>
      </div>
      
      <div className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-yellow-400 text-xl">Loading scores...</div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <Trophy className="mx-auto text-yellow-400 mb-4" size={48} />
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">HALL OF FAME</h2>
              <p className="text-gray-400">Top Pac-Man players of all time</p>
            </div>
            
            <div className="bg-blue-900 bg-opacity-30 rounded-lg border border-blue-600 overflow-hidden">
              <div className="grid grid-cols-5 gap-4 p-4 bg-blue-800 bg-opacity-50 font-bold text-yellow-400 text-sm">
                <div className="text-center">RANK</div>
                <div>PLAYER</div>
                <div className="text-center">SCORE</div>
                <div className="text-center">LEVEL</div>
                <div className="text-center">DATE</div>
              </div>
              
              {highScores.map((score, index) => (
                <div 
                  key={score.id}
                  className={`grid grid-cols-5 gap-4 p-4 border-b border-blue-700 hover:bg-blue-800 hover:bg-opacity-30 transition-colors ${
                    index === 0 ? 'bg-yellow-900 bg-opacity-20' : ''
                  }`}
                >
                  <div className="text-center font-bold">
                    {index === 0 && <Trophy className="inline text-yellow-400" size={16} />}
                    #{index + 1}
                  </div>
                  <div className="font-bold text-white truncate">
                    {score.playerName}
                  </div>
                  <div className="text-center font-mono text-yellow-400 font-bold">
                    {formatScore(score.score)}
                  </div>
                  <div className="text-center flex items-center justify-center gap-1">
                    <Target size={14} />
                    {score.level}
                  </div>
                  <div className="text-center text-sm text-gray-400 flex items-center justify-center gap-1">
                    <Calendar size={14} />
                    {new Date(score.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
            
            {highScores.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  No high scores yet. Be the first!
                </div>
                <Button 
                  onClick={() => navigate('/game')}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3"
                >
                  Start Playing
                </Button>
              </div>
            )}
            
            <div className="text-center mt-8">
              <Button 
                onClick={() => navigate('/game')}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 mr-4"
              >
                Play Now
              </Button>
              <Button 
                onClick={handleBack}
                variant="outline"
                className="border-blue-600 text-white hover:bg-blue-600 px-8 py-3"
              >
                Main Menu
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};