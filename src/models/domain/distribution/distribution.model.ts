import { BaseResponse } from "@/models/common";

export interface DistributionQueryParams {
  skip?: number;
  take?: number;
  searchTerm?: string;
  sortField?: string;
  sortDirection?: boolean;
}

export interface DistributionRequest {
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
}

export interface DistributionItem {
  id: number;
  dagitim_tarihi: number; // timestamp
  havuzgrup: number;
  yibfid: number;
  belgeno: number;
  unvan: string;
  m2: number;
  ilid: number;
  il_name: string;
}

export type DistributionResponse = BaseResponse<DistributionItem>;
