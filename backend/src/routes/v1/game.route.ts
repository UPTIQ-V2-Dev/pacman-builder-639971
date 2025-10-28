import express from 'express';
import { highScoreController, gameStatsController } from '../../controllers/index.ts';
import auth from '../../middlewares/auth.ts';
import validate from '../../middlewares/validate.ts';
import { highScoreValidation, gameStatsValidation } from '../../validations/index.ts';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Game
 *   description: Game high scores and statistics management
 */

/**
 * @swagger
 * /api/highscores:
 *   get:
 *     summary: Get high scores leaderboard
 *     description: Get paginated list of high scores ordered by score descending
 *     tags: [Game]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Maximum number of results per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   playerName:
 *                     type: string
 *                   score:
 *                     type: integer
 *                   level:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     format: date-time
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/highscores', validate(highScoreValidation.getHighScores), highScoreController.getLeaderboard);

/**
 * @swagger
 * /api/scores:
 *   post:
 *     summary: Submit a new game score
 *     description: Submit a new high score entry
 *     tags: [Game]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - playerName
 *               - score
 *               - level
 *               - date
 *             properties:
 *               playerName:
 *                 type: string
 *               score:
 *                 type: integer
 *                 minimum: 0
 *               level:
 *                 type: integer
 *                 minimum: 1
 *               date:
 *                 type: string
 *                 format: date-time
 *             example:
 *               playerName: "PACMASTER"
 *               score: 15000
 *               level: 3
 *               date: "2025-10-28T12:00:00Z"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 playerName:
 *                   type: string
 *                 score:
 *                   type: integer
 *                 level:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date-time
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */
router.post('/scores', validate(highScoreValidation.createHighScore), highScoreController.createHighScore);

/**
 * @swagger
 * /api/player-stats:
 *   get:
 *     summary: Get player game statistics
 *     description: Get authenticated user's game statistics
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gamesPlayed:
 *                   type: integer
 *                 totalScore:
 *                   type: integer
 *                 highestLevel:
 *                   type: integer
 *                 totalPelletsEaten:
 *                   type: integer
 *                 totalGhostsEaten:
 *                   type: integer
 *                 averageScore:
 *                   type: integer
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/player-stats', auth('getOwnGameStats'), gameStatsController.getPlayerStats);

/**
 * @swagger
 * /api/game-stats:
 *   put:
 *     summary: Update player game statistics
 *     description: Update authenticated user's game statistics
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gamesPlayed:
 *                 type: integer
 *                 minimum: 0
 *               totalScore:
 *                 type: integer
 *                 minimum: 0
 *               highestLevel:
 *                 type: integer
 *                 minimum: 0
 *               totalPelletsEaten:
 *                 type: integer
 *                 minimum: 0
 *               totalGhostsEaten:
 *                 type: integer
 *                 minimum: 0
 *               averageScore:
 *                 type: integer
 *                 minimum: 0
 *             example:
 *               gamesPlayed: 48
 *               totalScore: 250000
 *               highestLevel: 7
 *               totalPelletsEaten: 1950
 *               totalGhostsEaten: 130
 *               averageScore: 5208
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gamesPlayed:
 *                   type: integer
 *                 totalScore:
 *                   type: integer
 *                 highestLevel:
 *                   type: integer
 *                 totalPelletsEaten:
 *                   type: integer
 *                 totalGhostsEaten:
 *                   type: integer
 *                 averageScore:
 *                   type: integer
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */
router.put('/game-stats', auth('manageOwnGameStats'), validate(gameStatsValidation.updatePlayerStats), gameStatsController.updatePlayerStats);

export default router;