import { gql } from '@apollo/client';

export const GET_PARKS_BY_IDS = gql`
  query GetParksByIds($ids: [String!]!) {
    getParksByIds(ids: $ids) {
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
