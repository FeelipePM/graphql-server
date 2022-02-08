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
          password: await generateHash(password),
          birthDate,
        }
      });
      return newUser;
    },

    signIn: async (parent, args) => {
      const hash = "$2b$08$vf0vGEFqUfbY0dIPyWhDnez3L7hrXwLHkg33QPFHiEXr/g0/KU0Uu";

      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await compareHash(args.password, user.password);

      if (!isPasswordValid) {
        throw new Error('Password is invalid');
      } else {
        return user;
      }
    }
  },

}

