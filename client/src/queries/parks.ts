import { gql } from '@apollo/client';

export const GET_PARKS = gql`
  query GetParks($offset: Int, $limit: Int) {
    getParks(offset: $offset, limit: $limit) {
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
