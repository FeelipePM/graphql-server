import jwt from "jsonwebtoken";

export function ensureAuthenticated(req) {
  const token = req.headers.authorization;

  if (!token) {
    return {};
  }

  try {
    const { sub } = jwt.verify(token, process.env.APP_SECRET);

    return {
      user: {
        id: sub,
      },
    };
  } catch {
    throw new Error("Invalid JWT token", 401);
  }
}
