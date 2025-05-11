export interface ExperimentMaterialCategory {
  id: number;
  active: boolean;
  xmin: number;
  name: string;
  priorityId: number;
}

export interface ExperimentMaterial {
  id: number;
  active: boolean;
  xmin: number;
  experimentMaterialCategory: ExperimentMaterialCategory;
  name: string;
  priorityId: number;
}

export interface Standards {
  id: number;
  active: boolean;
  xmin: number;
  experimentMaterialCategory: ExperimentMaterialCategory;
  name: string;
}

export interface ExperimentMaterialStandardItem {
  id: number;
  active: boolean;
  xmin: number;
  experimentMaterial: ExperimentMaterial;
  standards: Standards;
}

export interface ExperimentMaterialStandardResponse {
  items: ExperimentMaterialStandardItem[];
  totalCount: number;
  groupCount: number;
  success: boolean;
}

export interface ExperimentMaterialStandardQueryParams {
  skip?: number;
  take?: number;
  searchTerm?: string;
  sortField?: string;
  sortDirection?: boolean;
}
