import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API client functions
export const authApi = {
  signup: (data: { email: string; password: string; confirmPassword: string }) =>
    api.post('/api/auth/signup', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/api/auth/login', data),
  
  logout: () => api.post('/api/auth/logout'),
  
  getCurrentUser: () => api.get('/api/auth/me'),
};

export const draftsApi = {
  create: (data: any) => api.post('/api/drafts', data),
  
  getAll: () => api.get('/api/drafts'),
  
  getById: (id: string) => api.get(`/api/drafts/${id}`),
  
  update: (id: string, data: any) => api.put(`/api/drafts/${id}`, data),
  
  delete: (id: string) => api.delete(`/api/drafts/${id}`),
};

export const toolsApi = {
  rewrite: (data: { text: string; style?: string }) =>
    api.post('/api/tools/rewrite', data),
  
  generateCitations: (data: { references: any[] }) =>
    api.post('/api/tools/citations', data),
  
  checkGrammar: (data: { text: string; language?: string }) =>
    api.post('/api/tools/grammar', data),
  
  detectAI: (data: { text: string }) =>
    api.post('/api/tools/ai-detect', data),
  
  getResearchSuggestions: (data: { query: string }) =>
    api.post('/api/tools/research', data),
};

export default api;

