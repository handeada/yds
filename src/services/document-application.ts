import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuditorQueryParams, AuditorResponse, AuditorRequest } from "@/models";

export const DocumentApplication = createApi({
  reducerPath: "auditorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://businessyds.csb.gov.tr/api/",
  }),
  endpoints: (builder) => ({
    getAuditorList: builder.query<AuditorResponse, AuditorQueryParams>({
      query: (params) => ({
        url: "documentApplication/findAllPublicAuditors",
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
        } as AuditorRequest,
      }),
    }),
  }),
});

export const { useGetAuditorListQuery } = DocumentApplication;
