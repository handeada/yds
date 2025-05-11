import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { HttpMethod } from "@/libs/axios";
import {
  LabExperimentMaterialStandardQueryParams,
  LabExperimentMaterialStandardResponse,
} from "@/models";

export const LabExperimentMaterialStandards = createApi({
  reducerPath: "labExperimentMaterialStandardsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["LabExperimentMaterialStandards"],
  endpoints: (builder) => ({
    findAllScopeList: builder.query<
      LabExperimentMaterialStandardResponse,
      LabExperimentMaterialStandardQueryParams
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
          userData: params.userData,
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
