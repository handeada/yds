import { createApi } from "@reduxjs/toolkit/query/react";

import { HttpMethod } from "@/libs/axios";
import {
  CityStatisticsItem,
  CityStatisticsResponse,
} from "@/models/city-statistics";
import axiosBaseQuery from "@/utils/axiosBaseQuery";

export const CityStatisticsService = createApi({
  reducerPath: "CityStatisticsService",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["CityStatistics"],
  endpoints: (builder) => ({
    getCityStatistics: builder.query<CityStatisticsItem[], number>({
      query: (plakaNo) => ({
        url: `/department/findAllPublicStatistics/${plakaNo}`,
        method: HttpMethod.Get,
      }),
      transformResponse: (response: CityStatisticsResponse) =>
        response.items || [],
      providesTags: ["CityStatistics"],
    }),
  }),
});

export const { useGetCityStatisticsQuery } = CityStatisticsService;
