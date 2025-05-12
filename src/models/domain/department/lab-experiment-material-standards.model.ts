import { BaseResponse, ExperimentMaterialStandardItem } from "@/models";

export interface LabScopeListParams {
  skip?: number;
  take?: number;
  searchTerm?: string;
  sortField?: string;
  sortDirection?: boolean;
  fileNumber: number;
}
export type LabScopeListResponse = BaseResponse<ExperimentMaterialStandardItem>;
