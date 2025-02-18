import { useQuery } from '@apollo/client';
import { GET_PARKS_BY_IDS } from '../queries/getParksByIds';

export function useParksByIds(ids: string[]) {
  const { loading, error, data } = useQuery(GET_PARKS_BY_IDS, {
    variables: { ids },
    skip: ids.length === 0,
  });

  return {
    parks: data?.getParksByIds.data || [],
    loading,
    error: error?.message,
  };
}
