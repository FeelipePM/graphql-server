import { hash, compare } from 'bcrypt';

 export const generateHash = async (password) => {
  const hashedPassword = await hash(password, 8);
  return hashedPassword;
}

export const compareHash = async (password, passwordHashed) => {
  const comparedHash = await compare(password, passwordHashed);
  return comparedHash;
}
