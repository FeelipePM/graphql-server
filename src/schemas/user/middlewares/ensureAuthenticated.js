import jwt from "jsonwebtoken";
import authConfig from "../../../config/auth.js";

export const ensureAuthenticated = (req, res = null, next = null) => {
  const token = req.headers.authorization;
  const express_source = !!next;
  // dois cenarios, com express, com gql

  if (!token) {
    if (express_source) {
      return res.status(401).json({ error: "Token invalid" });
    }

    return {};
  }

  const treatedToken = token.replace("Bearer ", "");

  const { secret } = authConfig.jwt;

  try {
    const { sub } = jwt.verify(treatedToken, secret);
    const user = {
      id: sub,
    };

    if (express_source) {
      req.locals = { user };
      return next();
    }

    return { user };
  } catch {
    if (express_source) {
      return res.status(401).json({ error: "Token invalid" });
    }
    throw new Error("Invalid JWT token", 401);
  }
};
