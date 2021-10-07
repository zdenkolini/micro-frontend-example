import { AxiosResponse } from "axios";
import axiosInstance from ".";
import ServiceRoutes from "../constants/serviceRoutes";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface LoginError {
  status: number;
  message: string;
}

const authService = {
  login: (payload: LoginPayload) =>
    axiosInstance.post<LoginPayload, AxiosResponse<LoginResponse>>(
      ServiceRoutes.LOGIN,
      payload
    ),
};

export default authService;
