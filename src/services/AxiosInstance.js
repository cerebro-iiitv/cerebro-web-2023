import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cerebro-backend-2023.onrender.com/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!!token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: Refresh token
    return Promise.reject(error);
  }
);

export default axiosInstance;