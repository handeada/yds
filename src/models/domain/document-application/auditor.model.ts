import { BaseItem, BaseResponse } from "@/models/common";

export interface AuditorQueryParams {
  id: number;
  skip?: number;
  take?: number;
  searchTerm?: string;
  sortField?: string;
  sortDirection?: boolean;
}

export interface AuditorRequest {
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

export type AuditorItem = BaseItem;

export type AuditorResponse = BaseResponse<AuditorItem>;
