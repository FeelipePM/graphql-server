import { prisma } from "../shared/database/prismaClient.js";

export const postImagesController = async (req, res) => {
  const postImage = await prisma.postImages.create({
    data: {
      path: req.file.path,
      post: {
        connect: {
          id: "feb0a63d-7b16-4e05-b95f-430a37b82e2b",
        },
      },
    },
  });
  return res.send({ postImage });
};
