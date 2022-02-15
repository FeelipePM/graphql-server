import { prisma } from '../../../database/prismaClient.js';
import pkg from 'jsonwebtoken';
import { compareHash } from '../providers/hashProvider.js';
import authConfig from '../../../config/auth.js';

const { sign, verify } = pkg;

export async function authenticateUserService(email, password) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await compareHash(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Incorrect email / password combination.', 401);
  }

  const { secret, expiresIn } = authConfig.jwt;

  const token = sign({}, secret ,{
    subject: user.id,
    expiresIn
  });

  const userAuthenticate = {
    user,
    token
  }

  const decoded = verify(token, authConfig.jwt.secret);
  console.log(decoded.sub);

  return userAuthenticate;
}
