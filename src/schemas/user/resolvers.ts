import { prisma } from '../../database/prismaClient';

const date = new Date();

const currentYear = date.getFullYear();

interface createUser {
  name: string
  password: string
  email: string
  birthDate: string
  createdAt: string
}

interface user {
  id: string
}

interface parent {
  birthDate: string
}

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_:void, { id }: user) => prisma.user.findUnique({
      where: {
        id: id,
      },
    }),
  },

  User: {
    age: (parent: parent) => {
      const calculateBirthdateInAge =  currentYear - new Date(parent.birthDate).getFullYear();
      return calculateBirthdateInAge;
    },
  },

  Mutation: {
    createUser: async (_:void, { name,email, password, birthDate }: createUser ) => {
    const newUser = await prisma.user.create({
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
