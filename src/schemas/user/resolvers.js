import { prisma } from '../../database/prismaClient.js';
import { generateHash, compareHash } from './providers/hashProvider.js';


const date = new Date();

const currentYear = date.getFullYear();

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_, { id }) => prisma.user.findUnique({
      where: {
        id: id,
      },
    }),
  },

  User: {
    age: (parent) => {
      const calculateBirthdateInAge =  currentYear - new Date(parent.birthDate).getFullYear();
      return calculateBirthdateInAge;
    },
  },

  Mutation: {
    createUser: async (_, { name,email, password, birthDate }) => {
    const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: generateHash(password),
          birthDate,
        }
      });
      return newUser;
    },

    signIn: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      const isPasswordValid = await compareHash(password, user.password);

      console.log(!isPasswordValid ? 'Invalid password' : 'Valid password');

      return user;
    }
  },

}
