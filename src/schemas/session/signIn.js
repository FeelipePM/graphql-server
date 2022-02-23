import { authenticateUserService } from "../user/services/authenticateUserService.js";

export const signIn = async (_, { email, password }, ctx) => {
  const userToken = await authenticateUserService(email, password);

  return userToken;
};
