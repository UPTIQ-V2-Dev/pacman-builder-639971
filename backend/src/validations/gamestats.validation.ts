import Joi from 'joi';

const createGameStats = {
    body: Joi.object().keys({
        userId: Joi.number().integer().required(),
        gamesPlayed: Joi.number().integer().min(0),
        totalScore: Joi.number().integer().min(0),
        highestLevel: Joi.number().integer().min(0),
        totalPelletsEaten: Joi.number().integer().min(0),
        totalGhostsEaten: Joi.number().integer().min(0),
        averageScore: Joi.number().integer().min(0)
    })
};

const getGameStats = {
    query: Joi.object().keys({
        limit: Joi.number().integer().min(1).max(100),
        page: Joi.number().integer().min(1),
        sortBy: Joi.string(),
        sortType: Joi.string().valid('asc', 'desc')
    })
};

const getGameStatsById = {
    params: Joi.object().keys({
        gameStatsId: Joi.number().integer().required()
    })
};

const updateGameStats = {
    params: Joi.object().keys({
        gameStatsId: Joi.number().integer().required()
    }),
    body: Joi.object()
        .keys({
            gamesPlayed: Joi.number().integer().min(0),
            totalScore: Joi.number().integer().min(0),
            highestLevel: Joi.number().integer().min(0),
            totalPelletsEaten: Joi.number().integer().min(0),
            totalGhostsEaten: Joi.number().integer().min(0),
            averageScore: Joi.number().integer().min(0)
        })
        .min(1)
};

const updatePlayerStats = {
    body: Joi.object()
        .keys({
            gamesPlayed: Joi.number().integer().min(0),
            totalScore: Joi.number().integer().min(0),
            highestLevel: Joi.number().integer().min(0),
            totalPelletsEaten: Joi.number().integer().min(0),
            totalGhostsEaten: Joi.number().integer().min(0),
            averageScore: Joi.number().integer().min(0)
        })
        .min(1)
};

const deleteGameStats = {
    params: Joi.object().keys({
        gameStatsId: Joi.number().integer().required()
    })
};

export default {
    createGameStats,
    getGameStats,
    getGameStatsById,
    updateGameStats,
    updatePlayerStats,
    deleteGameStats
};