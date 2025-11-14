import express from 'express';
import {
  createQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuiz,
  updateQuiz
} from '../controllers/quizController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Quiz Management APIs
 */

/**
 * @swagger
 * /api/quizzes:
 *   get:
 *     summary: Get all quizzes
 *     tags: [Quizzes]
 *     responses:
 *       200:
 *         description: List of quizzes retrieved successfully
 */
router.get('/', getAllQuizzes);

/**
 * @swagger
 * /api/quizzes:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quizzes]
 *     responses:
 *       201:
 *         description: Quiz created successfully
 */
router.post('/', createQuiz);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   get:
 *     summary: Get a quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz fetched successfully
 */
router.get('/:id', getQuiz);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   put:
 *     summary: Update a quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 */
router.put('/:id', updateQuiz);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   delete:
 *     summary: Delete a quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 */
router.delete('/:id', deleteQuiz);

export default router;
