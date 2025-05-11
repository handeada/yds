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
  tagTypes: ["LabScopeList"],
  endpoints: (builder) => ({
    getLabScopeList: builder.query<
      LabExperimentMaterialStandardResponse,
      LabExperimentMaterialStandardQueryParams
    >({
      query: (params) => ({
        url: "labExperimentMaterialStandards/findAllScopeList",
        method: HttpMethod.Post,
        providesTags: (params: LabExperimentMaterialStandardQueryParams) => [
          { type: "LabScopeList", id: params.fileNumber },
        ],
        data: {
          requireTotalCount: true,
          searchOperation: "contains",
          searchValue: params.searchTerm || null,
          skip: params.skip || 0,
          take: params.take || 10,
          userData: params.fileNumber,
          sort: params.sortField
            ? [
                {
                  selector: params.sortField,
                  desc: params.sortDirection || false,
                },
              ]
            : [
                {
                  selector: "id",
                  desc: true,
                },
              ],
        },
      }),
    }),
  }),
});

export const { useGetLabScopeListQuery } = LabExperimentMaterialStandards;
