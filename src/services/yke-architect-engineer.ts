import { createApi } from "@reduxjs/toolkit/query/react";
import {
  YKEArchitectEngineerQueryParams,
  YKEArchitectEngineerResponse,
  YKEArchitectEngineerRequest,
} from "@/models/domain/document-application/yke-architect-engineer.model";
import axiosBaseQuery from "@/utils/axiosBaseQuery";

export const YKEArchitectEngineerApi = createApi({
  reducerPath: "ykeArchitectEngineerApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getYKEArchitectEngineerList: builder.query<
      YKEArchitectEngineerResponse,
      YKEArchitectEngineerQueryParams
    >({
      query: (params) => ({
        url: "accountApplication/findAllPublicYKEArchitectEngineers",
        method: "POST",
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
                  selector: "occupationalRegistrationNumber",
                  desc: false,
                },
              ],
          id: params.id,
        } as YKEArchitectEngineerRequest,
      }),
    }),
  }),
});

export const { useGetYKEArchitectEngineerListQuery } = YKEArchitectEngineerApi;
