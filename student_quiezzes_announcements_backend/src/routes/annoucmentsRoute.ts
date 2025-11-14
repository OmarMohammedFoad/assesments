import express from 'express';
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  getAnnouncement,
  updateAnnouncement
} from '../controllers/announcementController';

const router = express.Router();

/**
 * @swagger
 * /api/announcments:
 *   get:
 *     summary: Get all announcements
 *     tags: [Announcements]
 *     responses:
 *       200:
 *         description: Successfully fetched
 */
router.get('/', getAllAnnouncements);

/**
 * @swagger
 * /api/announcments:
 *   post:
 *     summary: Create new announcement
 *     tags: [Announcements]
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', createAnnouncement);

/**
 * @swagger
 * /api/announcments/{id}:
 *   get:
 *     summary: Get single announcement
 *     tags: [Announcements]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', getAnnouncement);

/**
 * @swagger
 * /api/announcments/{id}:
 *   put:
 *     summary: Update announcement
 *     tags: [Announcements]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 */
router.put('/:id', updateAnnouncement);

/**
 * @swagger
 * /api/announcments/{id}:
 *   delete:
 *     summary: Delete announcement
 *     tags: [Announcements]
 *     parameters:
 *       - name: id
 *         in: path
         required: true
 */
router.delete('/:id', deleteAnnouncement);

export default router;
