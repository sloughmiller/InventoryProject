import axios from 'axios';


console.log("🔧 Axios base URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

export async function fetchCurrentUser() {
  const response = await api.get('/users/me');
  return response.data;
}


export default api;
