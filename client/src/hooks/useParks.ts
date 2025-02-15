import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PARKS } from '../queries/parks';

export function useParks(itemsPerPage: number) {
  const [itemOffset, setItemOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const { loading, error, data, fetchMore } = useQuery(GET_PARKS, {
    variables: {
      offset: itemOffset,
      limit: itemsPerPage,
      searchTerm: searchTerm,
    },
  });

  const handlePageChange = (selected: number) => {
    const newOffset = selected * itemsPerPage;
    setItemOffset(newOffset);
    fetchMore({
      variables: {
        offset: newOffset,
        limit: itemsPerPage,
        searchTerm: searchTerm,
      },
    });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setItemOffset(0); // Reset to first page when searching
  };

  const totalParks = data?.getParks.total || 0;
  const pageCount = Math.ceil(totalParks / itemsPerPage);

  return {
    currentParks: data?.getParks.data || [],
    loading,
    error: error?.message || '',
    pageCount,
    handlePageChange,
    handleSearch,
    searchTerm,
  };
}
