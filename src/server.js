import { ApolloServer } from "apollo-server";
import { resolvers } from "./schemas/user/resolvers.js";
import { importSchema } from "graphql-import";
import { ensureAuthenticated } from "././schemas/user/middlewares/ensureAuthenticated.js";

const typeDefs = importSchema("./src/schemas/user/schema.graphql");

const context = ({ req }) => {
  const { user } = ensureAuthenticated(req);

  return {
    user,
  };
};

//export type Context = ReturnType <typeof context>;

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
