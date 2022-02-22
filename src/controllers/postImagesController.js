import { prisma } from "../database/prismaClient.js";
import { ApolloError } from "apollo-server";

export const postImagesController = async (req, res) => {
  if (!req.user)
    throw new ApolloError("You must be logged in to create a post");

  const postImage = await prisma.postImages.create({
    data: {
      path: req.file.path,
      post: {
        connect: {
          id: "faea50b4-81be-4606-8c6d-76969af3265e",
        },
      },
    },
  });
  return res.send({ postImage });
};
