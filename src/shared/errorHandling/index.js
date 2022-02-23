import { ApolloError } from "apollo-server";

export const errorHandling = (message, code, details) => {
  throw new ApolloError(message, code, details);
};
