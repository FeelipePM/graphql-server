import { prisma } from "../../database/prismaClient.js";
import { generateHash } from "./providers/hashProvider.js";
import { authenticateUserService } from "./services/authenticateUserService.js";
import { ApolloError } from "apollo-server";

const date = new Date();

const currentYear = date.getFullYear();

export const resolvers = {
  Query: {
    users: (parent, args, context) => {
      if (!context.user?.id) return new ApolloError("You must be logged in");

      return prisma.user.findMany();
    },
    user: (_, { id }) =>
      prisma.user.findUnique({
        where: {
          id: id,
        },
      }),
  },

  User: {
    age: (parent) => {
      const calculateBirthdateInAge =
        currentYear - new Date(parent.birthDate).getFullYear();
      return calculateBirthdateInAge;
    },
  },

  Mutation: {
    createUser: async (
      _,
      { name, email, password, birthDate, inputRole },
      context
    ) => {
      if (!context.user?.id) return new ApolloError("You must be logged in");

      const defaultRoleId = "3f67dd89-ee64-4e70-a932-fce87f5fcab6";

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: await generateHash(password),
          birthDate,
          UserRole: {
            create: {
              role_id: !inputRole ? defaultRoleId : inputRole,
            },
          },
        },
      });

      return newUser;
    },

    createPost: async (_, args, context) => {
      const { content, published, author_id } = args.data;

      if (!context.user?.id)
        throw new ApolloError("You must be logged in to create a post");

      if (!author_id)
        throw new ApolloError("You must be an author in to create a post");

      const newPost = await prisma.post.create({
        data: {
          content,
          published,
          author: {
            connect: {
              id: author_id,
            },
          },
        },
      });

      return newPost;
    },

    updatePost: async (_, args, context) => {
      const { id, content, published, author_id } = args.data;

      if (!context.user?.id)
        throw new ApolloError("You must be logged in to create a post");

      if (!author_id)
        throw new ApolloError("You must be an author in to create a post");

      const updatePost = await prisma.post.update({
        where: {
          id,
        },
        data: {
          content,
          published,
          author: {
            connect: {
              id: author_id,
            },
          },
        },
      });

      return updatePost;
    },

    signIn: async (_, { email, password }, context) => {
      const userToken = await authenticateUserService(email, password);

      return userToken;
    },
  },
};
