export interface ProvinceStatistics {
  provinceId: number;
  countTotalYibf: number;
  countTotalConstructionArea: number;
  countTotalActiveYdk: number;
  countTotalActiveLab: number;
  countTotalCountryYibf: number;
  countTotalCountryConstructionArea: number;
}

export interface ProvinceStatisticsResponse {
  items: ProvinceStatistics[];
  totalCount: number;
  groupCount: number;
  success: boolean;
}
