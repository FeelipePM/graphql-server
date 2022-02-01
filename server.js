import { ApolloServer } from 'apollo-server';
import { resolvers } from './src/resolvers.js';
import { importSchema } from 'graphql-import';

const typeDefs = importSchema('./src/schema.graphql');

const server = new ApolloServer({ 
  typeDefs: typeDefs, 
  resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});