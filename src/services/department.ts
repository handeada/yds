import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { HttpMethod } from "@/libs/axios";
import {
  ProvinceStatistics,
  ProvinceStatisticsResponse,
  YdkResponse,
  Filter,
  YdkQueryParams,
  LaboratoryResponse,
  LaboratoryQueryParams,
} from "@/models";

export const Department = createApi({
  reducerPath: "departmentApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["CityStatistics"],
  endpoints: (builder) => ({
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

    getLaboratoryList: builder.query<LaboratoryResponse, LaboratoryQueryParams>(
      {
        query: (params) => ({
          url: "department/findAllLabPublic",
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
              : [
                  {
                    selector: "fileNumber",
                    desc: false,
                  },
                ],
            filter: ["locationId", "=", params.locationId] as Filter,
          },
        }),
      }
    ),

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

export const {
  useGetYdkListQuery,
  useGetCityStatisticsQuery,
  useGetLaboratoryListQuery,
} = Department;
