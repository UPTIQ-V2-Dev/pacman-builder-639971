import { gameStatsService } from '../services/index.ts';
import { MCPTool } from '../types/mcp.ts';
import pick from '../utils/pick.ts';
import { z } from 'zod';

const gameStatsSchema = z.object({
    id: z.number(),
    gamesPlayed: z.number(),
    totalScore: z.number(),
    highestLevel: z.number(),
    totalPelletsEaten: z.number(),
    totalGhostsEaten: z.number(),
    averageScore: z.number(),
    userId: z.number()
});

const createGameStatsTool: MCPTool = {
    id: 'gamestats_create',
    name: 'Create Game Stats',
    description: 'Create new game statistics for a user',
    inputSchema: z.object({
        userId: z.number().int(),
        gamesPlayed: z.number().int().min(0).optional(),
        totalScore: z.number().int().min(0).optional(),
        highestLevel: z.number().int().min(0).optional(),
        totalPelletsEaten: z.number().int().min(0).optional(),
        totalGhostsEaten: z.number().int().min(0).optional(),
        averageScore: z.number().int().min(0).optional()
    }),
    outputSchema: gameStatsSchema,
    fn: async (inputs: { 
        userId: number; 
        gamesPlayed?: number; 
        totalScore?: number; 
        highestLevel?: number; 
        totalPelletsEaten?: number; 
        totalGhostsEaten?: number; 
        averageScore?: number; 
    }) => {
        const { userId, ...gameStatsData } = inputs;
        const gameStats = await gameStatsService.createGameStats(userId, gameStatsData);
        return gameStats;
    }
};

const getGameStatsTool: MCPTool = {
    id: 'gamestats_get_all',
    name: 'Get All Game Stats',
    description: 'Get all game statistics with optional filters and pagination',
    inputSchema: z.object({
        limit: z.number().int().min(1).max(100).optional(),
        page: z.number().int().min(1).optional(),
        sortBy: z.string().optional(),
        sortType: z.enum(['asc', 'desc']).optional()
    }),
    outputSchema: z.object({
        gameStats: z.array(gameStatsSchema)
    }),
    fn: async (inputs: { limit?: number; page?: number; sortBy?: string; sortType?: 'asc' | 'desc' }) => {
        const options = pick(inputs, ['limit', 'page', 'sortBy', 'sortType']);
        const result = await gameStatsService.queryGameStats({}, options);
        return { gameStats: result };
    }
};

const getGameStatsByIdTool: MCPTool = {
    id: 'gamestats_get_by_id',
    name: 'Get Game Stats By ID',
    description: 'Get game statistics by their ID',
    inputSchema: z.object({
        gameStatsId: z.number().int()
    }),
    outputSchema: gameStatsSchema,
    fn: async (inputs: { gameStatsId: number }) => {
        const gameStats = await gameStatsService.getGameStatsById(inputs.gameStatsId);
        if (!gameStats) {
            throw new Error('Game stats not found');
        }
        return gameStats;
    }
};

const getGameStatsByUserIdTool: MCPTool = {
    id: 'gamestats_get_by_user_id',
    name: 'Get Game Stats By User ID',
    description: 'Get game statistics by user ID',
    inputSchema: z.object({
        userId: z.number().int()
    }),
    outputSchema: gameStatsSchema.nullable(),
    fn: async (inputs: { userId: number }) => {
        const gameStats = await gameStatsService.getGameStatsByUserId(inputs.userId);
        return gameStats;
    }
};

const updateGameStatsTool: MCPTool = {
    id: 'gamestats_update',
    name: 'Update Game Stats',
    description: 'Update game statistics by ID',
    inputSchema: z.object({
        gameStatsId: z.number().int(),
        gamesPlayed: z.number().int().min(0).optional(),
        totalScore: z.number().int().min(0).optional(),
        highestLevel: z.number().int().min(0).optional(),
        totalPelletsEaten: z.number().int().min(0).optional(),
        totalGhostsEaten: z.number().int().min(0).optional(),
        averageScore: z.number().int().min(0).optional()
    }),
    outputSchema: gameStatsSchema,
    fn: async (inputs: { 
        gameStatsId: number; 
        gamesPlayed?: number; 
        totalScore?: number; 
        highestLevel?: number; 
        totalPelletsEaten?: number; 
        totalGhostsEaten?: number; 
        averageScore?: number; 
    }) => {
        const { gameStatsId, ...updateBody } = inputs;
        const gameStats = await gameStatsService.updateGameStatsById(gameStatsId, updateBody);
        return gameStats;
    }
};

const updateGameStatsByUserIdTool: MCPTool = {
    id: 'gamestats_update_by_user_id',
    name: 'Update Game Stats By User ID',
    description: 'Update game statistics by user ID',
    inputSchema: z.object({
        userId: z.number().int(),
        gamesPlayed: z.number().int().min(0).optional(),
        totalScore: z.number().int().min(0).optional(),
        highestLevel: z.number().int().min(0).optional(),
        totalPelletsEaten: z.number().int().min(0).optional(),
        totalGhostsEaten: z.number().int().min(0).optional(),
        averageScore: z.number().int().min(0).optional()
    }),
    outputSchema: gameStatsSchema,
    fn: async (inputs: { 
        userId: number; 
        gamesPlayed?: number; 
        totalScore?: number; 
        highestLevel?: number; 
        totalPelletsEaten?: number; 
        totalGhostsEaten?: number; 
        averageScore?: number; 
    }) => {
        const { userId, ...updateBody } = inputs;
        const gameStats = await gameStatsService.updateGameStatsByUserId(userId, updateBody);
        return gameStats;
    }
};

const deleteGameStatsTool: MCPTool = {
    id: 'gamestats_delete',
    name: 'Delete Game Stats',
    description: 'Delete game statistics by their ID',
    inputSchema: z.object({
        gameStatsId: z.number().int()
    }),
    outputSchema: z.object({
        success: z.boolean()
    }),
    fn: async (inputs: { gameStatsId: number }) => {
        await gameStatsService.deleteGameStatsById(inputs.gameStatsId);
        return { success: true };
    }
};

export const gameStatsTools: MCPTool[] = [
    createGameStatsTool,
    getGameStatsTool,
    getGameStatsByIdTool,
    getGameStatsByUserIdTool,
    updateGameStatsTool,
    updateGameStatsByUserIdTool,
    deleteGameStatsTool
];