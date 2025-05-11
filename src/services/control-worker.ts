import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ControlWorkerQueryParams,
  ControlWorkerResponse,
  ControlWorkerRequest,
} from "@/models/domain/document-application/control-worker.model";

export const ControlWorkerApi = createApi({
  reducerPath: "controlWorkerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://businessyds.csb.gov.tr/api/",
  }),
  endpoints: (builder) => ({
    getControlWorkerList: builder.query<
      ControlWorkerResponse,
      ControlWorkerQueryParams
    >({
      query: (params) => ({
        url: "accountApplication/findAllPublicControlWorkers",
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
        } as ControlWorkerRequest,
      }),
    }),
  }),
});

export const { useGetControlWorkerListQuery } = ControlWorkerApi;
