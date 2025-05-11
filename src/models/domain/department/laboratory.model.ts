export interface LaboratoryItem {
  id: number;
  fileNumber: number;
  name: string;
  phone?: string;
  address?: string;
  locationId: number;
  locationName: string;
  labType: string;
}

export interface LaboratoryResponse {
  items: LaboratoryItem[];
  totalCount: number;
  groupCount: number;
  success: boolean;
}

export interface LaboratoryQueryParams {
  locationId: number;
  skip?: number;
  take?: number;
  searchTerm?: string;
  sortField?: string;
  sortDirection?: boolean;
}
