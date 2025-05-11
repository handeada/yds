import { BaseItem, BaseResponse } from "@/models";

export interface YKEArchitectEngineerQueryParams {
  id: number;
  skip?: number;
  take?: number;
  searchTerm?: string;
  sortField?: string;
  sortDirection?: boolean;
}

export interface YKEArchitectEngineerRequest {
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

export type YKEArchitectEngineerItem = BaseItem;

export type YKEArchitectEngineerResponse =
  BaseResponse<YKEArchitectEngineerItem>;
