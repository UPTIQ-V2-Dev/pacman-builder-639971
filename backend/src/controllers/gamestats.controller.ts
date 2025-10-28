import { gameStatsService } from '../services/index.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsync from '../utils/catchAsync.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import pick from '../utils/pick.ts';
import httpStatus from 'http-status';

const createGameStats = catchAsyncWithAuth(async (req, res) => {
    const { userId, ...gameStatsData } = req.body;
    const gameStats = await gameStatsService.createGameStats(userId, gameStatsData);
    res.status(httpStatus.CREATED).send(gameStats);
});

const getGameStats = catchAsyncWithAuth(async (req, res) => {
    const filter = pick(req.validatedQuery, []);
    const options = pick(req.validatedQuery, ['limit', 'page', 'sortBy', 'sortType']);
    const result = await gameStatsService.queryGameStats(filter, options);
    res.send(result);
});

const getGameStatsById = catchAsyncWithAuth(async (req, res) => {
    const gameStats = await gameStatsService.getGameStatsById(parseInt(req.params.gameStatsId));
    if (!gameStats) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Game stats not found');
    }
    res.send(gameStats);
});

const getPlayerStats = catchAsyncWithAuth(async (req, res) => {
    const userId = req.user.id;
    const gameStats = await gameStatsService.getGameStatsByUserId(userId);
    if (!gameStats) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Stats not found');
    }
    // Return only the game stats without userId for API response
    const { userId: _, ...statsWithoutUserId } = gameStats as any;
    res.send(statsWithoutUserId);
});

const updateGameStats = catchAsyncWithAuth(async (req, res) => {
    const gameStats = await gameStatsService.updateGameStatsById(parseInt(req.params.gameStatsId), req.body);
    res.send(gameStats);
});

const updatePlayerStats = catchAsyncWithAuth(async (req, res) => {
    const userId = req.user.id;
    const gameStats = await gameStatsService.updateGameStatsByUserId(userId, req.body);
    if (!gameStats) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Stats not found');
    }
    // Return only the game stats without userId for API response
    const { userId: _, ...statsWithoutUserId } = gameStats as any;
    res.send(statsWithoutUserId);
});

const deleteGameStats = catchAsyncWithAuth(async (req, res) => {
    await gameStatsService.deleteGameStatsById(parseInt(req.params.gameStatsId));
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createGameStats,
    getGameStats,
    getGameStatsById,
    getPlayerStats,
    updateGameStats,
    updatePlayerStats,
    deleteGameStats
};