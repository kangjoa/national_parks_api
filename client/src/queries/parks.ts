import { gql } from '@apollo/client';

export const GET_PARKS = gql`
  query GetParks($offset: Int, $limit: Int, $searchTerm: String) {
    getParks(offset: $offset, limit: $limit, searchTerm: $searchTerm) {
      total
      data {
        id
        fullName
        description
        states
        images {
          url
          altText
        }
        weatherInfo
        directionsUrl
      }
    }
  }
`;
