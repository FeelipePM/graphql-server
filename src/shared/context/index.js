//export type Context = ReturnType <typeof context>;
import { prisma } from "../database/prismaClient.js";
import { ensureAuthenticated } from "../../schemas/user/middlewares/ensureAuthenticated.js";
import { errorHandling } from "../errorHandling/index.js";

export const context = async ({ req }) => {
  const { user } = await ensureAuthenticated(req);

  return {
    user,
    prisma,
    errorHandling,
  };
};
