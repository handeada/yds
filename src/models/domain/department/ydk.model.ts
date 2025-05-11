export type FilterValue = number;
export type FilterCondition = [string, string, FilterValue];
export type Filter = FilterCondition;

export interface YdkRequest {
  requireTotalCount: boolean;
  searchOperation: "contains";
  searchValue: string | null;
  skip: number;
  take: number;
  userData: Record<string, unknown>;
  sort: {
    selector: string;
    desc: boolean;
  }[];
  filter: Filter;
}

export interface YdkItem {
  id: number;
  fileNumber: string;
  name: string;
  address: string;
  phone?: string; // Optional phone field
}

export interface YdkResponse {
  items: YdkItem[];
  totalCount: number;
  groupCount: number;
  success: boolean;
}

export interface YdkQueryParams {
  locationId: number;
  skip?: number;
  take?: number;
  searchTerm?: string;
  sortField?: string;
  sortDirection?: boolean;
}
