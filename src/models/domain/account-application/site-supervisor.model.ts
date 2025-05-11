import { BaseItem, BaseResponse } from "@/models";

export interface SiteSupervisorQueryParams {
  id: number;
  skip?: number;
  take?: number;
  searchTerm?: string;
  sortField?: string;
  sortDirection?: boolean;
}

export interface SiteSupervisorRequest {
  requireTotalCount: boolean;
  searchOperation: string;
  searchValue: string | null;
  skip: number;
  take: number;
  userData: Record<string, unknown>;
  sort:
    | {
        selector: string;
        desc: boolean;
      }[]
    | null;
  id: number;
}

export type SiteSupervisorItem = BaseItem;

export type SiteSupervisorResponse = BaseResponse<SiteSupervisorItem>;
