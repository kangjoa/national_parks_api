import { gql } from '@apollo/client';

export const GET_PARKS = gql`
  query GetParks {
    getParks {
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
