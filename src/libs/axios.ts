import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

import { BACKEND_API_URL } from "@/utils/environmentUtils";

const api = axios.create({
  baseURL: BACKEND_API_URL,
});

if (typeof window !== "undefined") {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
  api.interceptors.response.use((response: AxiosResponse) => {
    return response.data;
  });
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
}

export enum HttpMethod {
  Delete = "DELETE",
  Get = "GET",
  Post = "POST",
  Put = "PUT",
}

export default api;
