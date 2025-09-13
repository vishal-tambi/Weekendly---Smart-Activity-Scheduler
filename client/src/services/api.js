import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Activities API
export const activitiesAPI = {
  getAll: (params = {}) => api.get('/activities', { params }),
  getById: (id) => api.get(`/activities/${id}`),
  getByCategory: (category) => api.get('/activities', { params: { category } }),
  getByMood: (mood) => api.get('/activities', { params: { mood } }),
};

// Plans API
export const plansAPI = {
  getAll: () => api.get('/plans'),
  getById: (id) => api.get(`/plans/${id}`),
  create: (planData) => api.post('/plans', planData),
  update: (id, planData) => api.put(`/plans/${id}`, planData),
  delete: (id) => api.delete(`/plans/${id}`),
};

export default api;