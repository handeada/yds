import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SiteSupervisorQueryParams,
  SiteSupervisorResponse,
  SiteSupervisorRequest,
} from "@/models/domain/document-application/site-supervisor.model";

export const SiteSupervisorApi = createApi({
  reducerPath: "siteSupervisorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://businessyds.csb.gov.tr/api/",
  }),
  endpoints: (builder) => ({
    getSiteSupervisorList: builder.query<
      SiteSupervisorResponse,
      SiteSupervisorQueryParams
    >({
      query: (params) => ({
        url: "accountApplication/findAllPublicSiteSupervisors",
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
            : null,
          id: params.id,
        } as SiteSupervisorRequest,
      }),
    }),
  }),
});

export const { useGetSiteSupervisorListQuery } = SiteSupervisorApi;
