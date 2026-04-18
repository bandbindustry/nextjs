// src/api/api.ts
import axios from "axios";

export const isTestEnv = process.env.NEXT_PUBLIC_USE_TEST_API === "true";

const BASE_URL = isTestEnv
  ? (process.env.NEXT_PUBLIC_API_TEST_URL ??
    "http://adminpanel.bandbindustry.com/api/Test")
  : (process.env.NEXT_PUBLIC_API_URL ??
    "http://adminpanel.bandbindustry.com/api");
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

export default api;
