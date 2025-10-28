import { highScoreService } from '../services/index.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsync from '../utils/catchAsync.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import pick from '../utils/pick.ts';
import httpStatus from 'http-status';

const createHighScore = catchAsync(async (req, res) => {
    const { playerName, score, level, date } = req.body;
    const userId = req.user?.id; // Optional user ID for authenticated requests
    const highScore = await highScoreService.createHighScore(playerName, score, level, new Date(date), userId);
    res.status(httpStatus.CREATED).send(highScore);
});

const getHighScores = catchAsync(async (req, res) => {
    const options = pick(req.validatedQuery, ['limit', 'page', 'sortBy', 'sortType']);
    const result = await highScoreService.queryHighScores({}, options);
    res.send(result);
});

const getLeaderboard = catchAsync(async (req, res) => {
    const { limit, page } = pick(req.validatedQuery, ['limit', 'page']);
    const result = await highScoreService.getLeaderboard(limit, page);
    res.send(result);
});

const getHighScore = catchAsync(async (req, res) => {
    const highScore = await highScoreService.getHighScoreById(req.params.highScoreId);
    if (!highScore) {
        throw new ApiError(httpStatus.NOT_FOUND, 'High score not found');
    }
    res.send(highScore);
});

const updateHighScore = catchAsyncWithAuth(async (req, res) => {
    const highScore = await highScoreService.updateHighScoreById(req.params.highScoreId, req.body);
    res.send(highScore);
});

const deleteHighScore = catchAsyncWithAuth(async (req, res) => {
    await highScoreService.deleteHighScoreById(req.params.highScoreId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createHighScore,
    getHighScores,
    getLeaderboard,
    getHighScore,
    updateHighScore,
    deleteHighScore
};