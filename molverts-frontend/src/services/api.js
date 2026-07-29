import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Provinces
  getProvinces: () => api.get('/provinces'),
  getProvince: (id) => api.get(`/provinces/${id}`),
  
  // Plants
  getPlants: () => api.get('/plantes'),
  getPlant: (id) => api.get(`/plantes/${id}`),
  getPlantsByProvince: (provinceId) => api.get(`/plantes?province_id=${provinceId}`),
  searchPlants: (query) => api.get(`/plantes?search=${query}`),
  
  // Molecules
  getMolecules: () => api.get('/molecules'),
  getMolecule: (id) => api.get(`/molecules/${id}`),
  getMoleculesByPlant: (plantId) => api.get(`/molecules?plant_id=${plantId}`),
  
  // Auth & Subscriptions
  login: (credentials) => api.post('/login', credentials),
  register: (data) => api.post('/register', data),
  getSubscription: () => api.get('/subscriptions'),
  updateSubscription: (data) => api.post('/subscriptions', data),
  
  // Search
  globalSearch: (query) => api.get(`/search?q=${query}`),
};

export default api;
