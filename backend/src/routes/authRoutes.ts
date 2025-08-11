import express from 'express';
import { register, login, refresh, logout, me } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', register);     // Admin-only in production for creating doctors/receptionists
router.post('/login', login);
router.post('/refresh', refresh);       // path used by cookie
router.post('/logout', logout);
router.get('/me', authMiddleware, me);

export default router;
