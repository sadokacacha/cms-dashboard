import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api"
});

axiosClient.interceptors.request.use((config) => {
  const token = cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
