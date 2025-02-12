import typeDefs from './schema.js';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const apikey = process.env.VITE_API_KEY;

// Define resolvers
const resolvers = {
  Query: {
    getAbout: () => {
      return { message: 'National Park Service API' };
    },
    getParks: async (_, { offset = 0, limit = 9 }) => {
      try {
        const response = await fetch(
          `https://developer.nps.gov/api/v1/parks?start=${offset}&limit=${limit}`,
          {
            headers: {
              'X-Api-Key': apikey,
            },
          }
        );
        const data = await response.json();
        return {
          total: data.total,
          data: data.data,
        };
      } catch (error) {
        console.error('Error fetching parks:', error);
        throw error;
      }
    },
  },
};

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

// Start this app
const port = 4000;
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
