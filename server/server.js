import typeDefs from './schema.js';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { resolvers } from './resolvers.js';
import { loadParks } from './lib/park-trie.js';

// Create an express app
const app = express();

// Apply cors
app.use(cors());
app.use(express.json());

// typeDefs is the schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

// Define GraphQL route
app.use('/graphql', expressMiddleware(server));

// Load parks into trie
await loadParks();

// Start this app
const port = 4000;
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
