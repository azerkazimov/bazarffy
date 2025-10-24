import type { UserRole } from '@/types/user.types';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5009';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data; // Server returns {token} directly
  },
};

export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateProfile: async (data: { bio?: string; sosialLinks?: { twitter?: string; facebook?: string; instagram?: string } }) => {
    const response = await api.patch('/users/me', data);
    return response.data;
  },

  deleteProfile: async () => {
    const response = await api.delete('/users/me');
    return response.data;
  },
  getAllUsers: async () => {
    const response = await api.get('/users/all');
    return response.data;
  },
  changeUserRole: async (userId: string, role: UserRole) => {
    const response = await api.patch(`/users/role`, { userId, role });
    return response.data;
  },
};

export default api;
