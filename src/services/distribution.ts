import { createApi } from "@reduxjs/toolkit/query/react";
import { DistributionResponse } from "@/models/domain/distribution/distribution.model";
import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { HttpMethod } from "@/libs/axios";

export const DistributionApi = createApi({
  reducerPath: "distributionApi",
  tagTypes: ["Distribution"],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getDistributionList: builder.query<DistributionResponse, number>({
      query: (cityId) => ({
        url: `/distribution/findAllPublic/${cityId}`,
        method: HttpMethod.Get,
      }),
      transformResponse: (response: DistributionResponse) => response || [],
      providesTags: (result, error, cityId) => [
        { type: "Distribution", id: cityId },
      ],
    }),
  }),
});

export const { useGetDistributionListQuery } = DistributionApi;
