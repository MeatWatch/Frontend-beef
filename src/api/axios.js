import axios from "axios";

// Buat instance axios dengan baseURL dari .env atau fallback ke localhost
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://backend-meatwatch-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menyisipkan token di header Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
