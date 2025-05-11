import { BaseResponse, ExperimentMaterial, Standards } from "@/models";

export interface LabExperimentMaterialStandardQueryParams {
  fileNumber: number;
  skip?: number;
  take?: number;
  searchTerm?: string;
  sortField?: string;
  sortDirection?: boolean;
}

export type LabExperimentMaterialStandardResponse =
  BaseResponse<LabExperimentMaterialStandardItem>;

export interface LabExperimentMaterialStandardItem {
  id: number;
  active: boolean;
  xmin: number;
  experimentMaterialStandards: ExperimentMaterialStandards;
  laboratory: unknown;
}
export interface ExperimentMaterialStandards {
  id: number;
  active: boolean;
  xmin: number;
  experimentMaterial: ExperimentMaterial;
  standards: Standards;
}
