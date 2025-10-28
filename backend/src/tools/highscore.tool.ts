import { highScoreService } from '../services/index.ts';
import { MCPTool } from '../types/mcp.ts';
import pick from '../utils/pick.ts';
import { z } from 'zod';

const highScoreSchema = z.object({
    id: z.string(),
    playerName: z.string(),
    score: z.number(),
    level: z.number(),
    date: z.string(),
    userId: z.number().nullable()
});

const createHighScoreTool: MCPTool = {
    id: 'highscore_create',
    name: 'Create High Score',
    description: 'Create a new high score entry',
    inputSchema: z.object({
        playerName: z.string(),
        score: z.number().int().min(0),
        level: z.number().int().min(1),
        date: z.string(),
        userId: z.number().int().optional()
    }),
    outputSchema: highScoreSchema,
    fn: async (inputs: { playerName: string; score: number; level: number; date: string; userId?: number }) => {
        const highScore = await highScoreService.createHighScore(
            inputs.playerName,
            inputs.score,
            inputs.level,
            new Date(inputs.date),
            inputs.userId
        );
        return {
            ...highScore,
            date: highScore.date.toISOString()
        };
    }
};

const getHighScoresTool: MCPTool = {
    id: 'highscore_get_all',
    name: 'Get All High Scores',
    description: 'Get all high scores with optional filters and pagination',
    inputSchema: z.object({
        limit: z.number().int().min(1).max(100).optional(),
        page: z.number().int().min(1).optional(),
        sortBy: z.string().optional(),
        sortType: z.enum(['asc', 'desc']).optional()
    }),
    outputSchema: z.object({
        highScores: z.array(highScoreSchema)
    }),
    fn: async (inputs: { limit?: number; page?: number; sortBy?: string; sortType?: 'asc' | 'desc' }) => {
        const options = pick(inputs, ['limit', 'page', 'sortBy', 'sortType']);
        const result = await highScoreService.queryHighScores({}, options);
        return {
            highScores: result.map(highScore => ({
                ...highScore,
                date: new Date(highScore.date).toISOString()
            }))
        };
    }
};

const getLeaderboardTool: MCPTool = {
    id: 'highscore_get_leaderboard',
    name: 'Get High Scores Leaderboard',
    description: 'Get the high scores leaderboard ordered by score',
    inputSchema: z.object({
        limit: z.number().int().min(1).max(100).optional(),
        page: z.number().int().min(1).optional()
    }),
    outputSchema: z.object({
        leaderboard: z.array(highScoreSchema)
    }),
    fn: async (inputs: { limit?: number; page?: number }) => {
        const result = await highScoreService.getLeaderboard(inputs.limit, inputs.page);
        return {
            leaderboard: result.map(highScore => ({
                ...highScore,
                date: new Date(highScore.date).toISOString()
            }))
        };
    }
};

const getHighScoreTool: MCPTool = {
    id: 'highscore_get_by_id',
    name: 'Get High Score By ID',
    description: 'Get a single high score by its ID',
    inputSchema: z.object({
        highScoreId: z.string()
    }),
    outputSchema: highScoreSchema,
    fn: async (inputs: { highScoreId: string }) => {
        const highScore = await highScoreService.getHighScoreById(inputs.highScoreId);
        if (!highScore) {
            throw new Error('High score not found');
        }
        return {
            ...highScore,
            date: new Date(highScore.date).toISOString()
        };
    }
};

const updateHighScoreTool: MCPTool = {
    id: 'highscore_update',
    name: 'Update High Score',
    description: 'Update high score information by ID',
    inputSchema: z.object({
        highScoreId: z.string(),
        playerName: z.string().optional(),
        score: z.number().int().min(0).optional(),
        level: z.number().int().min(1).optional(),
        date: z.string().optional()
    }),
    outputSchema: highScoreSchema,
    fn: async (inputs: { highScoreId: string; playerName?: string; score?: number; level?: number; date?: string }) => {
        const updateBody = pick(inputs, ['playerName', 'score', 'level']);
        if (inputs.date) {
            (updateBody as any).date = new Date(inputs.date);
        }
        const highScore = await highScoreService.updateHighScoreById(inputs.highScoreId, updateBody);
        return {
            ...highScore,
            date: new Date(highScore.date).toISOString()
        };
    }
};

const deleteHighScoreTool: MCPTool = {
    id: 'highscore_delete',
    name: 'Delete High Score',
    description: 'Delete a high score by its ID',
    inputSchema: z.object({
        highScoreId: z.string()
    }),
    outputSchema: z.object({
        success: z.boolean()
    }),
    fn: async (inputs: { highScoreId: string }) => {
        await highScoreService.deleteHighScoreById(inputs.highScoreId);
        return { success: true };
    }
};

export const highScoreTools: MCPTool[] = [
    createHighScoreTool,
    getHighScoresTool,
    getLeaderboardTool,
    getHighScoreTool,
    updateHighScoreTool,
    deleteHighScoreTool
];