import { prisma } from '../../database/prismaClient.js';


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
    createUser: (_, { name,email, password, birthDate }) => {
    const newUser = prisma.user.create({
        data: {
          name,
          email,
          password,
          birthDate,
        }
      });
      return newUser;
    }
  },

}