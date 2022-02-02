import { ApolloServer } from 'apollo-server';
import { resolvers } from './schemas/user/resolvers.js';
import { importSchema } from 'graphql-import';

const typeDefs = importSchema('./src/schemas/user/schema.graphql');

const server = new ApolloServer({ 
  typeDefs: typeDefs, 
  resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});