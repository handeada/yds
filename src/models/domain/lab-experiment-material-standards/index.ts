import { ExperimentMaterial, Standards } from "@/models";

export interface LabExperimentMaterialStandardQueryParams {
  fileNumber: number;
  skip?: number;
  take?: number;
  searchTerm?: string;
  sortField?: string;
  sortDirection?: boolean;
}

export interface LabExperimentMaterialStandardResponse {
  items: LabExperimentMaterialStandardItem[];
  totalCount: number;
  groupCount: number;
  success: boolean;
}

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
