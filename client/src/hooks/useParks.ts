import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PARKS } from '../queries/parks';
import { Park } from '../types';

export function useParks(itemsPerPage: number) {
  const [itemOffset, setItemOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const { loading, error, data, fetchMore } = useQuery(GET_PARKS, {
    variables: { offset: itemOffset, limit: itemsPerPage },
  });

  const handlePageChange = (selected: number) => {
    const newOffset = selected * itemsPerPage;
    setItemOffset(newOffset);
    fetchMore({
      variables: { offset: newOffset, limit: itemsPerPage },
    });
  };

  // Filter parks based on search term
  const filteredParks =
    data?.getParks.data.filter((park: Park) => {
      const nameMatch = park.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const stateMatch = park.states
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return stateMatch || (nameMatch && !stateMatch);
    }) || [];

  const totalParks = data?.getParks.total || 0;
  const pageCount = Math.ceil(totalParks / itemsPerPage);

  // Reset to first page when searching
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setItemOffset(0);
  };

  const currentParks = filteredParks;

  return {
    currentParks,
    loading,
    error: error?.message || '',
    pageCount,
    handlePageChange,
    handleSearch,
    searchTerm,
  };
}
