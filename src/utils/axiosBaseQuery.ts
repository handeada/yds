import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import api from "@/libs/axios";

export interface AxiosBaseQueryError {
  status?: number;
  data?: unknown;
}

export default function axiosBaseQuery() {
  return async ({
    url,
    method,
    data,
    params,
  }: AxiosRequestConfig): Promise<any> => {
    try {
      const result = await api({
        url,
        method,
        data,
        params,
      });
      return { data: result };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
}
