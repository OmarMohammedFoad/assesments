import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
dotenv.config();
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and get a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: User logged in successfully and token returned
 */
router.post("/login", (req: Request, res: Response) => {
  const user = { id: 1, name: "user" };

  return res.json({
    user,
    token: jwt.sign(user, `${process.env.SECERT_KEY}`, { expiresIn: "1h" })
  });
});

export default router;
