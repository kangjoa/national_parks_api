import { npsApiClient } from './api/NPSApiClient.js';
import { parkTrie } from './lib/park-trie.js';

// Filter parks if search term provided
function filterParksBySearchTerm(parks, searchTerm) {
  if (!searchTerm) return parks;

  const normalizedSearchTerm = searchTerm.toLowerCase();

  return parks.filter((park) => {
    const normalizedParkName = park.fullName.toLowerCase();
    const normalizedStates = park.states.toLowerCase();

    const nameMatch = normalizedParkName.includes(normalizedSearchTerm);
    const stateMatch = normalizedStates.includes(normalizedSearchTerm);
    const matchesSearchCriteria = stateMatch || nameMatch;

    return matchesSearchCriteria;
  });
}

// Handle pagination logic
function paginateParks(parks, offset, limit) {
  return parks.slice(offset, offset + limit);
}

export const resolvers = {
  Query: {
    getAbout: () => {
      return { message: 'National Park Service API' };
    },
    getParks: async (_, { offset = 0, limit = 9, searchTerm = '' }) => {
      try {
        // Fetch all parks if searching or paginated amount if not
        const fetchLimit = searchTerm ? 500 : limit;

        // Fetch parks from API using client
        const apiData = await npsApiClient.fetchParks(offset, fetchLimit);
        const filteredData = filterParksBySearchTerm(apiData.data, searchTerm);
        const paginatedData = searchTerm
          ? paginateParks(filteredData, offset, limit)
          : filteredData;

        const total = searchTerm
          ? filteredData.length.toString()
          : apiData.total;
        return {
          total,
          data: paginatedData,
        };
      } catch (error) {
        console.error('Error fetching parks:', error);
        throw error;
      }
    },
    getParksByIds: async (_, { ids }) => {
      try {
        // Fetch parks by IDs from API using client
        const apiData = await npsApiClient.fetchParksByIds(ids);
        return { total: apiData.data.length.toString(), data: apiData.data };
      } catch (error) {
        console.error('Error fetching parks by IDs:', error);
        throw error;
      }
    },
    autocomplete: (_, { prefix }) => {
      return parkTrie.complete(prefix.toLowerCase());
    },
  },
};
