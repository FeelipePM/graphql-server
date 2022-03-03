import { importSchema } from "graphql-import";
import { ApolloServer } from "apollo-server";
import express from "express";
import cors from "cors";

import { resolvers } from "./schemas/user/resolvers.js";
import routes from "./shared/routes/index.js";
import { context } from "./shared/context/index.js";

const typeDefs = importSchema("./src/schemas/user/schema.graphql");

const app = express();

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  context,
});

app.use(cors());
app.use(routes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
