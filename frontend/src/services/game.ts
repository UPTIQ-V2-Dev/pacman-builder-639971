import { api } from '../lib/api';
import type { HighScore, GameStats } from '../types/game';
import { MOCK_HIGH_SCORES, MOCK_GAME_STATS } from '../data/gameData';

export const gameService = {
  async getHighScores(): Promise<HighScore[]> {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      return MOCK_HIGH_SCORES;
    }
    
    try {
      const response = await api.get<HighScore[]>('/api/highscores');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch high scores:', error);
      return MOCK_HIGH_SCORES;
    }
  },

  async submitScore(score: number, playerName: string, level: number): Promise<boolean> {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('Mock: Submitting score:', { score, playerName, level });
      return true;
    }

    try {
      await api.post('/api/scores', {
        score,
        playerName,
        level,
        date: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error('Failed to submit score:', error);
      return false;
    }
  },

  async getPlayerStats(): Promise<GameStats> {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      return MOCK_GAME_STATS;
    }

    try {
      const response = await api.get<GameStats>('/api/player-stats');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch player stats:', error);
      return MOCK_GAME_STATS;
    }
  },

  async updateGameStats(stats: Partial<GameStats>): Promise<boolean> {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('Mock: Updating game stats:', stats);
      return true;
    }

    try {
      await api.put('/api/game-stats', stats);
      return true;
    } catch (error) {
      console.error('Failed to update game stats:', error);
      return false;
    }
  },
};