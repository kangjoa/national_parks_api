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
    getParks: async (_, { offset = 0, limit = 9, searchTerm = '' }) => {
      try {
        // Fetch all parks if searching or paginated amount if not
        const fetchLimit = searchTerm ? 500 : limit;
        const response = await fetch(
          `https://developer.nps.gov/api/v1/parks?start=${offset}&limit=${fetchLimit}`,
          {
            headers: {
              'X-Api-Key': apikey,
            },
          }
        );

        const data = await response.json();

        // Filter parks if search term provided
        let filteredData = data.data;
        if (searchTerm) {
          filteredData = data.data.filter((park) => {
            const nameMatch = park.fullName
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
            const stateMatch = park.states
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
            return stateMatch || (nameMatch && !stateMatch);
          });

          // Get pagination to work with searching
          const totalFilteredResults = filteredData.length;
          // Apply pagination
          filteredData = filteredData.slice(offset, offset + limit);

          return {
            total: totalFilteredResults.toString(),
            data: filteredData,
          };
        }

        return {
          total: data.total,
          data: filteredData,
        };
      } catch (error) {
        console.error('Error fetching parks:', error);
        throw error;
      }
    },
    getParksByIds: async (_, { ids }) => {
      try {
        const response = await fetch(
          `https://developer.nps.gov/api/v1/parks?id=${ids.join(',')}`,
          {
            headers: {
              'X-Api-Key': apikey,
            },
          }
        );
        const data = await response.json();
        return {
          total: data.data.length.toString(),
          data: data.data,
        };
      } catch (error) {
        console.error('Error fetching parks by IDs:', error);
        throw new Error('Failed to fetch parks by IDs');
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
