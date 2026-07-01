import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const API_KEY = import.meta.env.VITE_API_KEY || 'mon-super-token-secret-2024';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  },
});

// =============================================
// ARTISANS
// =============================================

export const getArtisans = async (params = {}) => {
  const response = await apiClient.get('/artisans', { params });
  return response.data;
};

export const getTopArtisans = async () => {
  const response = await apiClient.get('/artisans/top');
  return response.data;
};

export const getArtisanById = async (id) => {
  const response = await apiClient.get(`/artisans/${id}`);
  return response.data;
};

export const searchArtisans = async (query) => {
  const response = await apiClient.get('/artisans/search', { params: { q: query } });
  return response.data;
};

export const getStats = async () => {
  const response = await apiClient.get('/artisans/stats');
  return response.data;
};

// =============================================
// CATÉGORIES
// =============================================

export const getCategories = async () => {
  const response = await apiClient.get('/categories');
  return response.data;
};

// =============================================
// SPÉCIALITÉS
// =============================================

export const getSpecialites = async () => {
  const response = await apiClient.get('/specialites');
  return response.data;
};