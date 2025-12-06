import dotenv from 'dotenv';

dotenv.config();

/**
 * API client for National Park Service API
 * Encapsulates all API-related configuration and methods
 */
class NPSApiClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://developer.nps.gov/api/v1/parks';
  }

  /**
   * Builds headers with API key
   * @returns Headers object for fetch requests
   */
  getHeaders() {
    return {
      'X-Api-Key': this.apiKey,
    };
  }

  /**
   * Handles fetch response and error checking
   * @param {Response} response - Fetch response object
   * @param {string} errorMessage - Custom error message if request fails
   * @returns {Promise<Object>} Parsed JSON response
   * @throws {Error} If response is not ok
   */
  async handleResponse(response, errorMessage) {
    if (!response.ok) {
      throw new Error(
        `${errorMessage}: ${response.statusText || response.status}`
      );
    }
    return await response.json();
  }

  /**
   * Fetches parks with pagination support
   * @param {number} offset - Starting index for pagination
   * @param {number} limit - Number of parks to fetch
   * @returns {Promise<Object>} API response with parks data
   */
  async fetchParks(offset = 0, limit = 9) {
    const url = `${this.baseUrl}?start=${offset}&limit=${limit}`;
    const response = await fetch(url, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(response, 'Failed to fetch parks');
  }

  /**
   * Fetches parks by their IDs
   * @param {string[]} ids - Array of park IDs to fetch
   * @returns {Promise<Object>} API response with parks data
   */
  async fetchParksByIds(ids) {
    const url = `${this.baseUrl}?id=${ids.join(',')}`;
    const response = await fetch(url, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(response, 'Failed to fetch parks by IDs');
  }
}

// Create and export API client for shared use
const apiKey = process.env.VITE_API_KEY;
export const npsApiClient = new NPSApiClient(apiKey);

// Export class for tests
export default NPSApiClient;
