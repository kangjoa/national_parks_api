import { gql } from '@apollo/client';

export const AUTOCOMPLETE = gql`
  query Autocomplete($prefix: String!) {
    autocomplete(prefix: $prefix)
  }
`;
