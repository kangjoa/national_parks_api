import { describe, expect, it, beforeEach, vi } from 'vitest';
import { resolvers } from './resolvers.js';

describe('resolvers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getParks should return parks', async () => {
    // Mock the fetch function to avoid making real API calls
    const mockFetch = vi.spyOn(global, 'fetch');

    // Create a mock response that mimics the API structure
    const mockParksData = [
      { fullName: 'Yellowstone National Park', states: 'WY,MT,ID' },
      { fullName: 'Yosemite National Park', states: 'CA' },
      { fullName: 'Grand Canyon National Park', states: 'AZ' },
    ];

    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        total: '500',
        data: mockParksData,
      }),
    });

    // Call the resolver (first arg is parent/root, second is args)
    const result = await resolvers.Query.getParks(null, {
      offset: 0,
      limit: 9,
      searchTerm: '',
    });

    // Verify the result structure
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('data');
    expect(result.data).toHaveLength(3);
  });

  it('getParks should return parks with search term (name)', async () => {
    // Mock the fetch function to avoid making real API calls
    const mockFetch = vi.spyOn(global, 'fetch');

    // Create a mock response that mimics the API structure
    const mockParksData = [
      { fullName: 'Yellowstone National Park', states: 'WY,MT,ID' },
      { fullName: 'Point Reyes National Seashore', states: 'CA' },
      { fullName: 'Unicorn National Park', states: 'MT' },
    ];

    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        total: '500',
        data: mockParksData,
      }),
    });

    // Call the resolver (first arg is parent/root, second is args)
    const result = await resolvers.Query.getParks(null, {
      offset: 0,
      limit: 9,
      searchTerm: 'YE',
    });

    // Verify the result structure
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('data');
    expect(result.total).toBe('2');
  });

  it('getParks should return parks with search term (state)', async () => {
    // Mock the fetch function to avoid making real API calls
    const mockFetch = vi.spyOn(global, 'fetch');

    // Create a mock response that mimics the API structure
    const mockParksData = [
      { fullName: 'Yellowstone National Park', states: 'WY,MT,ID' },
      { fullName: 'Point Reyes National Seashore', states: 'CA' },
      { fullName: 'Unicorn National Park', states: 'MT' },
    ];

    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        total: '500',
        data: mockParksData,
      }),
    });

    // Call the resolver (first arg is parent/root, second is args)
    const result = await resolvers.Query.getParks(null, {
      offset: 0,
      limit: 9,
      searchTerm: 'mt',
    });

    // Verify the result structure
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('data');
    expect(result.total).toBe('2');
  });

  it('getParks should return parks with pagination', async () => {
    const mockFetch = vi.spyOn(global, 'fetch');

    // Create 15 parks
    const mockParksData = Array.from({ length: 15 }, (_, i) => ({
      fullName: `Park ${i + 1}`,
      states: 'CA',
    }));

    // Test 1: First page (offset=0, limit=5)
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        total: '15',
        data: mockParksData.slice(0, 5),
      }),
    });

    const firstPage = await resolvers.Query.getParks(null, {
      offset: 0,
      limit: 5,
      searchTerm: '',
    });

    expect(firstPage.data).toHaveLength(5);
    expect(firstPage.total).toBe('15');

    // Test 2: Second page (offset=5, limit=5)
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        total: '15',
        data: mockParksData.slice(5, 10),
      }),
    });

    const secondPage = await resolvers.Query.getParks(null, {
      offset: 5,
      limit: 5,
      searchTerm: '',
    });

    expect(secondPage.data).toHaveLength(5);
    expect(secondPage.total).toBe('15');
    // Verify different parks on page 2
    expect(secondPage.data[0].fullName).toBe('Park 6');
  });

  it('getParks should handle fetch errors', async () => {
    // Mock the fetch function to avoid making real API calls
    const mockFetch = vi.spyOn(global, 'fetch');

    mockFetch.mockRejectedValueOnce(new Error('Fetch error'));

    await expect(
      resolvers.Query.getParks(null, {
        offset: 0,
        limit: 9,
        searchTerm: '',
      })
    ).rejects.toThrow('Fetch error');
  });

  it('getParksByIds should return parks by ids', async () => {
    // Mock the fetch function to avoid making real API calls
    const mockFetch = vi.spyOn(global, 'fetch');

    // Create a mock response that mimics the API structure
    const mockParksData = [
      { id: '123', fullName: 'Fictional National Park', states: 'CA' },
      { id: '456', fullName: 'Another Fictional National Park', states: 'OR' },
    ];

    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        total: '2',
        data: mockParksData,
      }),
    });

    // Call the resolver (first arg is parent/root, second is args)
    const result = await resolvers.Query.getParksByIds(null, {
      ids: ['123', '456'],
    });

    // Verify the result structure
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('data');
    expect(result.data).toHaveLength(2);
    expect(result.data[0].id).toBe('123');
    expect(result.data[1].id).toBe('456');
  });

  it('getParksByIds should handle fetch errors', async () => {
    // Mock the fetch function to avoid making real API calls
    const mockFetch = vi.spyOn(global, 'fetch');

    mockFetch.mockRejectedValueOnce(new Error('Failed to fetch parks by IDs'));

    await expect(
      resolvers.Query.getParksByIds(null, {
        ids: ['123', '456'],
      })
    ).rejects.toThrow('Failed to fetch parks by IDs');
  });
});
