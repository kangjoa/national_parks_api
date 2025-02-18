import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PARKS } from '../queries/getParks';

export function useParks(itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const { loading, error, data, fetchMore } = useQuery(GET_PARKS, {
    variables: {
      offset: 0,
      limit: itemsPerPage,
      searchTerm,
    },
  });

  const handlePageChange = async (selected: number) => {
    setCurrentPage(selected);
    const offset = selected * itemsPerPage;

    await fetchMore({
      variables: {
        offset,
        limit: itemsPerPage,
        searchTerm,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(0);
  };

  const resetToFirstPage = async () => {
    setCurrentPage(0);
    setSearchTerm('');
    await fetchMore({
      variables: {
        offset: 0,
        limit: itemsPerPage,
        searchTerm: '',
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    });
  };

  const totalParks = parseInt(data?.getParks.total || '0');
  const pageCount = Math.ceil(totalParks / itemsPerPage);

  return {
    currentParks: data?.getParks.data || [],
    loading,
    error: error?.message,
    pageCount,
    handlePageChange,
    handleSearch,
    searchTerm,
    currentPage,
    resetToFirstPage,
  };
}
