import { ExperimentMaterialStandardItem } from "./experiment-material-standards.model";

export interface LabScopeListParams {
  skip?: number;
  take?: number;
  searchTerm?: string;
  sortField?: string;
  sortDirection?: boolean;
  fileNumber: number;
}

export interface LabScopeListResponse {
  items: ExperimentMaterialStandardItem[];
  totalCount: number;
  groupCount: number;
  success: boolean;
}
