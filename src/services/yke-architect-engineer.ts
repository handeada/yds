import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  YKEArchitectEngineerQueryParams,
  YKEArchitectEngineerResponse,
  YKEArchitectEngineerRequest,
} from "@/models/domain/document-application/yke-architect-engineer.model";

export const YKEArchitectEngineerApi = createApi({
  reducerPath: "ykeArchitectEngineerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://businessyds.csb.gov.tr/api/",
  }),
  endpoints: (builder) => ({
    getYKEArchitectEngineerList: builder.query<
      YKEArchitectEngineerResponse,
      YKEArchitectEngineerQueryParams
    >({
      query: (params) => ({
        url: "accountApplication/findAllPublicYKEArchitectEngineers",
        method: "POST",
        body: {
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
