import api from './api';

export const userService = {
  // Register new user
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    favoriteTeam?: string;
  }) => {
    const response = await api.post('/users/register', userData);
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    return response.data;
  },

  // Login
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/users/login', credentials);
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
  },

  // Get user by ID
  getUserById: async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  // Update user
  updateUser: async (userId: string, updates: any) => {
    const response = await api.put(`/users/${userId}`, updates);
    return response.data;
  },
};
