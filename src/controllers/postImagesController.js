import { prisma } from "../shared/database/prismaClient.js";
import { ApolloError } from "apollo-server";

export const postImagesController = async (req, res) => {
  if (!req.user)
    throw new ApolloError("You must be logged in to create a post");

  const postImage = await prisma.postImages.create({
    data: {
      path: req.file.path,
      post: {
        connect: {
          id: "58fbccc3-8e29-45a4-86e9-d68461a04f29",
        },
      },
    },
  });
  return res.send({ postImage });
};
