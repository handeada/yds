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

export interface ControlWorkerItem {
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

export interface ControlWorkerResponse {
  items: ControlWorkerItem[];
  totalCount: number;
  groupCount: number;
  success: boolean;
}
