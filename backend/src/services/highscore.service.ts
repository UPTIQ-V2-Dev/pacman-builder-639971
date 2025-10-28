import prisma from '../client.ts';
import { HighScore, Prisma } from '../generated/prisma/index.js';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';

/**
 * Create a high score
 * @param {Object} highScoreData
 * @returns {Promise<HighScore>}
 */
const createHighScore = async (
    playerName: string,
    score: number,
    level: number,
    date: Date,
    userId?: number
): Promise<HighScore> => {
    return prisma.highScore.create({
        data: {
            playerName,
            score,
            level,
            date,
            userId
        }
    });
};

/**
 * Query for high scores
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryHighScores = async <Key extends keyof HighScore>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = ['id', 'playerName', 'score', 'level', 'date', 'userId'] as Key[]
): Promise<Pick<HighScore, Key>[]> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy ?? 'score';
    const sortType = options.sortType ?? 'desc';
    
    const highScores = await prisma.highScore.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortType }
    });
    return highScores as Pick<HighScore, Key>[];
};

/**
 * Get high score by id
 * @param {string} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<HighScore, Key> | null>}
 */
const getHighScoreById = async <Key extends keyof HighScore>(
    id: string,
    keys: Key[] = ['id', 'playerName', 'score', 'level', 'date', 'userId'] as Key[]
): Promise<Pick<HighScore, Key> | null> => {
    return (await prisma.highScore.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    })) as Promise<Pick<HighScore, Key> | null>;
};

/**
 * Update high score by id
 * @param {string} highScoreId
 * @param {Object} updateBody
 * @returns {Promise<HighScore>}
 */
const updateHighScoreById = async <Key extends keyof HighScore>(
    highScoreId: string,
    updateBody: Prisma.HighScoreUpdateInput,
    keys: Key[] = ['id', 'playerName', 'score', 'level', 'date'] as Key[]
): Promise<Pick<HighScore, Key> | null> => {
    const highScore = await getHighScoreById(highScoreId, ['id']);
    if (!highScore) {
        throw new ApiError(httpStatus.NOT_FOUND, 'High score not found');
    }
    const updatedHighScore = await prisma.highScore.update({
        where: { id: highScore.id },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
    return updatedHighScore as Pick<HighScore, Key> | null;
};

/**
 * Delete high score by id
 * @param {string} highScoreId
 * @returns {Promise<HighScore>}
 */
const deleteHighScoreById = async (highScoreId: string): Promise<HighScore> => {
    const highScore = await getHighScoreById(highScoreId);
    if (!highScore) {
        throw new ApiError(httpStatus.NOT_FOUND, 'High score not found');
    }
    await prisma.highScore.delete({ where: { id: highScore.id } });
    return highScore;
};

/**
 * Get high scores leaderboard
 * @param {number} [limit] - Maximum number of results (default = 10)
 * @param {number} [page] - Current page (default = 1)
 * @returns {Promise<HighScore[]>}
 */
const getLeaderboard = async (limit: number = 10, page: number = 1): Promise<HighScore[]> => {
    return prisma.highScore.findMany({
        orderBy: { score: 'desc' },
        take: limit,
        skip: (page - 1) * limit,
        select: {
            id: true,
            playerName: true,
            score: true,
            level: true,
            date: true
        }
    }) as Promise<HighScore[]>;
};

export default {
    createHighScore,
    queryHighScores,
    getHighScoreById,
    updateHighScoreById,
    deleteHighScoreById,
    getLeaderboard
};