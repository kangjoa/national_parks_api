import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PARKS } from '../queries/parks';
import { Park } from '../types';

export function useParks(itemsPerPage: number) {
  const { loading, error, data } = useQuery(GET_PARKS);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

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

  const pageCount = Math.ceil(filteredParks.length / itemsPerPage);

  const handlePageChange = (selected: number) => {
    setItemOffset((selected * itemsPerPage) % filteredParks.length);
  };

  // Reset to first page when searching
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setItemOffset(0);
  };

  const currentParks = filteredParks.slice(
    itemOffset,
    itemOffset + itemsPerPage
  );

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
