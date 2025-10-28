import type { HighScore, GameStats } from '../types/game';

export const MOCK_HIGH_SCORES: HighScore[] = [
  {
    id: '1',
    playerName: 'PACMASTER',
    score: 125430,
    level: 8,
    date: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    playerName: 'GHOSTHUNTER',
    score: 98760,
    level: 6,
    date: '2024-01-14T15:45:00Z',
  },
  {
    id: '3',
    playerName: 'PELLETKING',
    score: 87230,
    level: 5,
    date: '2024-01-13T09:15:00Z',
  },
  {
    id: '4',
    playerName: 'MAZEMAN',
    score: 76540,
    level: 5,
    date: '2024-01-12T14:20:00Z',
  },
  {
    id: '5',
    playerName: 'DOTSLAYER',
    score: 65890,
    level: 4,
    date: '2024-01-11T11:00:00Z',
  },
  {
    id: '6',
    playerName: 'CHOMPER',
    score: 54320,
    level: 4,
    date: '2024-01-10T16:30:00Z',
  },
  {
    id: '7',
    playerName: 'YELLOWNINJA',
    score: 43210,
    level: 3,
    date: '2024-01-09T13:45:00Z',
  },
  {
    id: '8',
    playerName: 'ARCADEPRO',
    score: 32100,
    level: 3,
    date: '2024-01-08T12:15:00Z',
  },
];

export const MOCK_GAME_STATS: GameStats = {
  gamesPlayed: 47,
  totalScore: 234560,
  highestLevel: 6,
  totalPelletsEaten: 1893,
  totalGhostsEaten: 124,
  averageScore: 4990,
};