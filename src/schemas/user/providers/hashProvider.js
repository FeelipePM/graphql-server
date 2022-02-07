import { hash, compare } from 'bcrypt';

const password = '';
const passwordHashed = '';

 export const generateHash = async () => {
  const hashedPassword = await hash(password, 8);
  return hashedPassword;

}

export const compareHash = async () => {
  const comparedHash = await compare(password, passwordHashed);
  return comparedHash;

}

generateHash();
compareHash();


