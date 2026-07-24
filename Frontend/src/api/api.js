import axios from "axios";
import { getLocal } from "../utils/storage";

const API_BASE_URL = `${
  import.meta.env.VITE_API_URL || "https://service-mart-new-backend-o2q4.onrender.com"
}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getLocal("homefix_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
