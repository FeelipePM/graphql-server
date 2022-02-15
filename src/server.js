import { ApolloServer } from 'apollo-server';
import { resolvers } from './schemas/user/resolvers.js';
import { importSchema } from 'graphql-import';
import { ensureAuthenticated } from '././schemas/user/middlewares/ensureAuthenticated.js';

const typeDefs = importSchema('./src/schemas/user/schema.graphql');

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
   context: ({ req }) => {
    const token = req.headers.authorization || '';

    if (!token) {
      throw new Error('JWT token is missing', 401);
    }

    const user = ensureAuthenticated(token);

     return { user };
   }
 });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
