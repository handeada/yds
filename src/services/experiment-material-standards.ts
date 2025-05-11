import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { HttpMethod } from "@/libs/axios";
import {
  ExperimentMaterialStandardResponse,
  ExperimentMaterialStandardQueryParams,
} from "@/models";

export const ExperimentMaterialStandards = createApi({
  reducerPath: "experimentMaterialStandardsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["ExperimentMaterialStandards"],
  endpoints: (builder) => ({
    getExperimentMaterialStandardsList: builder.query<
      ExperimentMaterialStandardResponse,
      ExperimentMaterialStandardQueryParams
    >({
      query: (params) => ({
        url: "experimentMaterialStandards/publicFindAllExperimentMaterialStandards",
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
        },
      }),
    }),
  }),
});

export const { useGetExperimentMaterialStandardsListQuery } =
  ExperimentMaterialStandards;
