import { findSession } from '../lib/session.js';
import { AppError } from '../lib/errors.js';

export async function requireAuth(req, _res, next) {
  const token = req.cookies?.session;
  const user = token ? await findSession(token).catch(() => null) : null;
  if (!user) {
    return next(new AppError(401, 'UNAUTHORIZED', 'log in first'));
  }
  req.user = user;
  next();
}

export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.user) return next(new AppError(401, 'UNAUTHORIZED'));
  if (!roles.includes(req.user.role)) return next(new AppError(403, 'FORBIDDEN'));
  next();
};
