import { createApi } from "@reduxjs/toolkit/query/react";
import { AuditorQueryParams, AuditorResponse, AuditorRequest } from "@/models";
import axiosBaseQuery from "@/utils/axiosBaseQuery";

export const DocumentApplication = createApi({
  reducerPath: "documentApplicationApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getAuditorList: builder.query<AuditorResponse, AuditorQueryParams>({
      query: (params) => ({
        url: "documentApplication/findAllPublicAuditors",
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
            : null,
          id: params.id,
        } as AuditorRequest,
      }),
    }),
  }),
});

export const { useGetAuditorListQuery } = DocumentApplication;
