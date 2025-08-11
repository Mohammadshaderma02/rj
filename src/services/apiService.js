// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7170/';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log('Making API request:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const customerService = {
  /**
   * Get customer lines by national ID
   * @param {string} nationalId - Customer's national ID
   * @returns {Promise} API response
   */
  getCustomerLines: async (nationalId) => {
    try {
      const response = await apiClient.post(`/RegisteredLineInquriy?Token=${nationalId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch customer lines');
    }
  }
};

export default apiClient;