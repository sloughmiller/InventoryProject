// src/api/api.ts
import axios from 'axios';

console.log("🔧 Axios base URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://inventoryproject-72il.onrender.com',
});

// Axios interceptor: attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('📤 Attaching token to request:', token);
  } else {
    console.warn('⚠️ No token found at request time');
  }
  return config;
});

/**
 * Force-set the token into Axios default headers.
 * Call this immediately after login before making any authenticated requests.
 */
export function setAuthToken(token: string) {
  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  console.log('✅ Auth token set in Axios headers and localStorage');
}

/**
 * Check if backend is healthy
 */
export async function checkBackendAvailable(): Promise<boolean> {
  try {
    const res = await api.get('/health');
    console.log("✅ Backend responded:", res.data); 
    return true;
  } catch (err) {
    console.error("❌ Backend check failed:", err);
    return false;
  }
}

/**
 * Fetch the currently logged-in user
 */
export async function fetchCurrentUser() {
  const response = await api.get('/users/me');
  return response.data;
}

export default api;
