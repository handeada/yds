import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { HttpMethod } from "@/libs/axios";
import {
  ProvinceStatistics,
  ProvinceStatisticsResponse,
  YdkResponse,
  Filter,
  YdkQueryParams,
} from "@/models";

export const Department = createApi({
  reducerPath: "departmentApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["CityStatistics"],
  endpoints: (builder) => ({
    // YDK related endpoints
    getYdkList: builder.query<YdkResponse, YdkQueryParams>({
      query: (params) => ({
        url: "department/findAllYdkPublic",
        method: HttpMethod.Post,
        data: {
          requireTotalCount: true,
          searchOperation: "contains",
          searchValue: params.searchTerm || null,
          skip: params.skip || 0,
          take: params.take || 10,
          userData: {},
          sort: params.sortField
            ? [
                {
                  selector: params.sortField,
                  desc: params.sortDirection || false,
                },
              ]
            : null,
          filter: ["locationId", "=", params.locationId] as Filter,
        },
      }),
    }),

    // City statistics endpoints
    getCityStatistics: builder.query<ProvinceStatistics[], number>({
      query: (plakaNo) => ({
        url: `/department/findAllPublicStatistics/${plakaNo}`,
        method: HttpMethod.Get,
      }),
      transformResponse: (response: ProvinceStatisticsResponse) =>
        response.items || [],
      providesTags: (result, error, plakaNo) => [
        { type: "CityStatistics", id: plakaNo },
      ],
    }),
  }),
});

export const { useGetYdkListQuery, useGetCityStatisticsQuery } = Department;
