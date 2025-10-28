import Joi from 'joi';

const createHighScore = {
    body: Joi.object().keys({
        playerName: Joi.string().required(),
        score: Joi.number().integer().min(0).required(),
        level: Joi.number().integer().min(1).required(),
        date: Joi.date().iso().required()
    })
};

const getHighScores = {
    query: Joi.object().keys({
        limit: Joi.number().integer().min(1).max(100),
        page: Joi.number().integer().min(1),
        sortBy: Joi.string(),
        sortType: Joi.string().valid('asc', 'desc')
    })
};

const getHighScore = {
    params: Joi.object().keys({
        highScoreId: Joi.string().required()
    })
};

const updateHighScore = {
    params: Joi.object().keys({
        highScoreId: Joi.string().required()
    }),
    body: Joi.object()
        .keys({
            playerName: Joi.string(),
            score: Joi.number().integer().min(0),
            level: Joi.number().integer().min(1),
            date: Joi.date().iso()
        })
        .min(1)
};

const deleteHighScore = {
    params: Joi.object().keys({
        highScoreId: Joi.string().required()
    })
};

export default {
    createHighScore,
    getHighScores,
    getHighScore,
    updateHighScore,
    deleteHighScore
};