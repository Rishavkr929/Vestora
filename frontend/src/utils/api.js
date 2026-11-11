import axios from "axios";

// Centralizes the API base URL and auth header so components don't each
// hardcode "http://localhost:3002" and repeat the token-reading boilerplate.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3002",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
