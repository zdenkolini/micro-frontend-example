import axios from "axios";
import TokenStore from "../util/tokenStore";

const axiosInstance = axios.create({
  baseURL: process.env.SERVICE_URL,
});

axiosInstance.interceptors.request.use((request) => {
  if (request.url !== "/auth/login") {
    if (request.headers)
      request.headers.Authorization = `Bearer ${TokenStore.authToken}`;
    else request.headers = { Authorization: `Bearer ${TokenStore.authToken}` };
  }
  return Promise.resolve(request);
});

export default axiosInstance;
