// apiService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';  // Adjust this to your server URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllUsers = () => {
  return apiService.get('/api/users/');
};

export const getUserById = (userId) => {
  return apiService.get(`/api/users/${userId}`);
};

// Add more API functions as needed (e.g., createUser, updateUser, etc.)

export default apiService;
