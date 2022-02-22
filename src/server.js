import { ApolloServer } from "apollo-server";
import { resolvers } from "./schemas/user/resolvers.js";
import { importSchema } from "graphql-import";
import { ensureAuthenticated } from "././schemas/user/middlewares/ensureAuthenticated.js";
import express from "express";
import routes from "../src/shared/routes/index.js";

const typeDefs = importSchema("./src/schemas/user/schema.graphql");

const app = express();

const context = async ({ req }) => {
  const { user } = await ensureAuthenticated(req);

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

app.use(routes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
