import axios from "axios";

const api = axios.create({
  baseURL: "https://donorlink-e3en.onrender.com/api", // backend URL
  withCredentials: true,            // required for cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
