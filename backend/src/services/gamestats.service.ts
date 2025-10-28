import prisma from '../client.ts';
import { GameStats, Prisma } from '../generated/prisma/index.js';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';

/**
 * Create game stats for a user
 * @param {number} userId
 * @param {Object} gameStatsData
 * @returns {Promise<GameStats>}
 */
const createGameStats = async (
    userId: number,
    gameStatsData: {
        gamesPlayed?: number;
        totalScore?: number;
        highestLevel?: number;
        totalPelletsEaten?: number;
        totalGhostsEaten?: number;
        averageScore?: number;
    } = {}
): Promise<GameStats> => {
    return prisma.gameStats.create({
        data: {
            userId,
            gamesPlayed: gameStatsData.gamesPlayed ?? 0,
            totalScore: gameStatsData.totalScore ?? 0,
            highestLevel: gameStatsData.highestLevel ?? 0,
            totalPelletsEaten: gameStatsData.totalPelletsEaten ?? 0,
            totalGhostsEaten: gameStatsData.totalGhostsEaten ?? 0,
            averageScore: gameStatsData.averageScore ?? 0
        }
    });
};

/**
 * Query for game stats
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryGameStats = async <Key extends keyof GameStats>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = [
        'id', 'gamesPlayed', 'totalScore', 'highestLevel', 
        'totalPelletsEaten', 'totalGhostsEaten', 'averageScore', 'userId'
    ] as Key[]
): Promise<Pick<GameStats, Key>[]> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    
    const gameStats = await prisma.gameStats.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });
    return gameStats as Pick<GameStats, Key>[];
};

/**
 * Get game stats by id
 * @param {number} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<GameStats, Key> | null>}
 */
const getGameStatsById = async <Key extends keyof GameStats>(
    id: number,
    keys: Key[] = [
        'id', 'gamesPlayed', 'totalScore', 'highestLevel',
        'totalPelletsEaten', 'totalGhostsEaten', 'averageScore', 'userId'
    ] as Key[]
): Promise<Pick<GameStats, Key> | null> => {
    return (await prisma.gameStats.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    })) as Promise<Pick<GameStats, Key> | null>;
};

/**
 * Get game stats by user id
 * @param {number} userId
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<GameStats, Key> | null>}
 */
const getGameStatsByUserId = async <Key extends keyof GameStats>(
    userId: number,
    keys: Key[] = [
        'id', 'gamesPlayed', 'totalScore', 'highestLevel',
        'totalPelletsEaten', 'totalGhostsEaten', 'averageScore', 'userId'
    ] as Key[]
): Promise<Pick<GameStats, Key> | null> => {
    return (await prisma.gameStats.findUnique({
        where: { userId },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    })) as Promise<Pick<GameStats, Key> | null>;
};

/**
 * Update game stats by id
 * @param {number} gameStatsId
 * @param {Object} updateBody
 * @returns {Promise<GameStats>}
 */
const updateGameStatsById = async <Key extends keyof GameStats>(
    gameStatsId: number,
    updateBody: Prisma.GameStatsUpdateInput,
    keys: Key[] = [
        'id', 'gamesPlayed', 'totalScore', 'highestLevel',
        'totalPelletsEaten', 'totalGhostsEaten', 'averageScore'
    ] as Key[]
): Promise<Pick<GameStats, Key> | null> => {
    const gameStats = await getGameStatsById(gameStatsId, ['id']);
    if (!gameStats) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Game stats not found');
    }
    const updatedGameStats = await prisma.gameStats.update({
        where: { id: gameStats.id },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
    return updatedGameStats as Pick<GameStats, Key> | null;
};

/**
 * Update game stats by user id
 * @param {number} userId
 * @param {Object} updateBody
 * @returns {Promise<GameStats>}
 */
const updateGameStatsByUserId = async <Key extends keyof GameStats>(
    userId: number,
    updateBody: Prisma.GameStatsUpdateInput,
    keys: Key[] = [
        'gamesPlayed', 'totalScore', 'highestLevel',
        'totalPelletsEaten', 'totalGhostsEaten', 'averageScore'
    ] as Key[]
): Promise<Pick<GameStats, Key> | null> => {
    // Try to get existing game stats or create new ones
    let gameStats = await getGameStatsByUserId(userId, ['id']);
    
    if (!gameStats) {
        // Create new game stats if they don't exist
        gameStats = await createGameStats(userId);
    }
    
    const updatedGameStats = await prisma.gameStats.update({
        where: { userId },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
    return updatedGameStats as Pick<GameStats, Key> | null;
};

/**
 * Delete game stats by id
 * @param {number} gameStatsId
 * @returns {Promise<GameStats>}
 */
const deleteGameStatsById = async (gameStatsId: number): Promise<GameStats> => {
    const gameStats = await getGameStatsById(gameStatsId);
    if (!gameStats) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Game stats not found');
    }
    await prisma.gameStats.delete({ where: { id: gameStats.id } });
    return gameStats;
};

export default {
    createGameStats,
    queryGameStats,
    getGameStatsById,
    getGameStatsByUserId,
    updateGameStatsById,
    updateGameStatsByUserId,
    deleteGameStatsById
};