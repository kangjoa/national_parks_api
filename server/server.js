import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const apikey = process.env.VITE_API_KEY;

// Create a schema
const typeDefs = `
  type Park {
    id: String!
    fullName: String!
    description: String
    states: String
    activities: [Activity]
    addresses: [Address]
  }

  type Activity {
    id: String!
    name: String!
  }

  type Address {
    line1: String
    line2: String
    line3: String
    city: String
    stateCode: String
    countryCode: String
    provinceTerritoryCode: String
    postalCode: String
    type: String
  }

  type About {
    message: String!
  }

  type ParksResponse {
    total: String
    data: [Park]
  }
    
  type Query {
    getAbout: About
    getParks: ParksResponse
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    getAbout: () => {
      return { message: 'National Park Service API' };
    },
    getParks: async () => {
      try {
        const response = await fetch('https://developer.nps.gov/api/v1/parks', {
          headers: {
            'X-Api-Key': apikey,
          },
        });
        return await response.json();
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
