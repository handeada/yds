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

export interface YKEArchitectEngineerItem {
  applicationTypeId: number;
  id: number;
  locationId: number;
  occupationalRegistrationNumber: string;
  personSurName: string;
  personName: string;
  taskId: number;
  taskName: string;
  titleName: string;
  working: boolean;
}

export interface YKEArchitectEngineerResponse {
  items: YKEArchitectEngineerItem[];
  totalCount: number;
  groupCount: number;
  success: boolean;
}
