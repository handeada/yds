import { BaseItem, BaseResponse } from "@/models";

export interface ControlWorkerQueryParams {
  id: number;
  skip?: number;
  take?: number;
  searchTerm?: string;
  sortField?: string;
  sortDirection?: boolean;
}

export interface ControlWorkerRequest {
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

export type ControlWorkerItem = BaseItem;

export type ControlWorkerResponse = BaseResponse<ControlWorkerItem>;
