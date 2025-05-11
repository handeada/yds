import { createApi } from "@reduxjs/toolkit/query/react";
import { DistributionResponse } from "@/models/domain/distribution/distribution.model";
import axiosBaseQuery from "@/utils/axiosBaseQuery";

export const DistributionApi = createApi({
  reducerPath: "distributionApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getDistributionList: builder.query<DistributionResponse[], number>({
      query: (cityId) => ({
        url: `distribution/findAllPublic/${cityId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDistributionListQuery } = DistributionApi;
