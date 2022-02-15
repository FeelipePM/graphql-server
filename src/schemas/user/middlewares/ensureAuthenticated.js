import jwt from 'jsonwebtoken';

export function ensureAuthenticated(token) {
try {
  const decoded = jwt.verify(token, process.env.APP_SECRET);
} catch {
  throw new Error('Invalid JWT token', 401);
}
}
