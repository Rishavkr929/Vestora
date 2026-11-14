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

const cache = new Map(); // url -> { at, promise }

export function cachedGet(url, ttlMs = 15000) {
  const hit = cache.get(url);
  if (hit && Date.now() - hit.at < ttlMs) {
    return hit.promise;
  }
  const promise = api.get(url);
  cache.set(url, { at: Date.now(), promise });
  promise.catch(() => cache.delete(url)); // never keep a failed request
  return promise;
}

// Forget saved answers. With a list of urls, forgets only those; with none,
// forgets everything (use this on logout).
export function clearApiCache(urls) {
  if (!urls) {
    cache.clear();
    return;
  }
  urls.forEach((u) => cache.delete(u));
}

export default api;
