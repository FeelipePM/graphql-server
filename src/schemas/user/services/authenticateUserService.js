import { ApolloError } from "apollo-server";
import pkg from "jsonwebtoken";

import authConfig from "../../../config/auth.js";
import { compareHash } from "../providers/hashProvider.js";
import { prisma } from "../../../shared/database/prismaClient.js";

const { sign } = pkg;

export async function authenticateUserService(email, password) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new ApolloError("User not found");
  }

  const isPasswordValid = await compareHash(password, user.password);

  if (!isPasswordValid) {
    throw new ApolloError("Incorrect email / password combination.", 401);
  }

  const { secret, expiresIn } = authConfig.jwt;

  const token = sign({}, secret, {
    subject: user.id,
    expiresIn,
  });

  const userAuthenticate = {
    user,
    token,
  };

  return userAuthenticate;
}
