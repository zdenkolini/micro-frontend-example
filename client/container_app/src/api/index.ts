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

axiosInstance.interceptors.response.use((response) => {
  if (response.status === 401) {
    TokenStore.logout();
    return Promise.reject(response);
  } else if (response.status >= 300 || response.status < 200) {
    return Promise.reject(response);
  }
  return Promise.resolve(response);
});

export default axiosInstance;
