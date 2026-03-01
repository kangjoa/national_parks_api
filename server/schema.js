export const typeDefs = `
  type Park {
    id: String!
    fullName: String!
    description: String
    states: String
    images: [Images]
    weatherInfo: String
    directionsUrl: String
    activities: [Activity]
    addresses: [Address]
  }

  type Images {
    url: String
    altText: String
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
    getParks(offset: Int, limit: Int, searchTerm: String): ParksResponse
    getParksByIds(ids: [String!]!): ParksResponse
    autocomplete(prefix: String!): [String]
  }
`;

export default typeDefs;
