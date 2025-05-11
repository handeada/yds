import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { HttpMethod } from "@/libs/axios";
import {
  YKEArchitectEngineerQueryParams,
  YKEArchitectEngineerResponse,
} from "@/models/domain/account-application/yke-architect-engineer.model";
import {
  SiteSupervisorQueryParams,
  SiteSupervisorResponse,
} from "@/models/domain/account-application/site-supervisor.model";
import {
  ControlWorkerQueryParams,
  ControlWorkerResponse,
} from "@/models/domain/account-application/control-worker.model";

export const AccountApplication = createApi({
  reducerPath: "accountApplicationApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getYKEArchitectEngineerList: builder.query<
      YKEArchitectEngineerResponse,
      YKEArchitectEngineerQueryParams
    >({
      query: (params) => ({
        url: "accountApplication/findAllPublicYKEArchitectEngineers",
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
            : [
                {
                  selector: "occupationalRegistrationNumber",
                  desc: false,
                },
              ],
          id: params.id,
        },
      }),
    }),

    getSiteSupervisorList: builder.query<
      SiteSupervisorResponse,
      SiteSupervisorQueryParams
    >({
      query: (params) => ({
        url: "accountApplication/findAllPublicSiteSupervisors",
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
          id: params.id,
        },
      }),
    }),

    getControlWorkerList: builder.query<
      ControlWorkerResponse,
      ControlWorkerQueryParams
    >({
      query: (params) => ({
        url: "accountApplication/findAllPublicControlWorkers",
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
          id: params.id,
        },
      }),
    }),
  }),
});

export const {
  useGetYKEArchitectEngineerListQuery,
  useGetSiteSupervisorListQuery,
  useGetControlWorkerListQuery,
} = AccountApplication;
