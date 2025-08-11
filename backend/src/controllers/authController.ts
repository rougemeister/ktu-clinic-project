import { Request, Response } from 'express';
import User from '../models/User';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/token';
import dotenv from 'dotenv';
dotenv.config();

const COOKIE_SECURE = process.env.COOKIE_SECURE === 'true';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already in use' });

  const user = new User({ name, email, password, role });
  await user.save();

  res.status(201).json({ message: 'User created', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await user.comparePassword(password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const payload = { sub: user._id, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  // set refresh token as httpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: COOKIE_SECURE,
    sameSite: 'lax',
    path: '/api/auth/refresh',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days (should match REFRESH_EXP)
  });

  res.json({
    accessToken,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });

  try {
    const payload = verifyRefreshToken(token) as any;
    // optional: verify token exists in DB or allowlist if implementing refresh rotation
    const newAccess = signAccessToken({ sub: payload.sub, role: payload.role });
    const newRefresh = signRefreshToken({ sub: payload.sub, role: payload.role });

    res.cookie('refreshToken', newRefresh, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: 'lax',
      path: '/api/auth/refresh',
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    res.json({ accessToken: newAccess });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const logout = async (req: Request, res: Response) => {
  // Invalidate refresh token server-side if storing tokens. For now clear cookie.
  res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
  res.json({ message: 'Logged out' });
};

export const me = async (req: Request, res: Response) => {
  // authMiddleware should have set req.user
  const user = (req as any).user;
  if (!user) return res.status(401).json({ message: 'Not authenticated' });
  res.json({ user });
};
