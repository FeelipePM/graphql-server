import { prisma } from '../../database/prismaClient.js';
import { generateHash } from './providers/hashProvider.js';
import { authenticateUserService } from './services/authenticateUserService.js';


const date = new Date();

const currentYear = date.getFullYear();

export const resolvers = {
  Query: {
    users: () => {
      // if(context.authScope !== ADMIN) throw new AuthenticationError('not admin');
      return prisma.user.findMany();
    },
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
    createUser: async (_, { name,email, password, birthDate, inputRole }) => {
      const defaultRoleId = "3f67dd89-ee64-4e70-a932-fce87f5fcab6"
    const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: await generateHash(password),
          birthDate,
          UserRole: {
            create: {
              role_id: !inputRole ? defaultRoleId : inputRole,
            }
          }
        }
      });

      return newUser;
    },

    signIn: async (_, { email, password }, ctx) => {

      const userToken = await authenticateUserService(email, password);

      return userToken;
    },
  },

}

