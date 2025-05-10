export interface CityStatisticsItem {
  provinceId: number;
  countTotalYibf: number;
  countTotalConstructionArea: number;
  countTotalActiveYdk: number;
  countTotalActiveLab: number;
  countTotalCountryYibf: number;
  countTotalCountryConstructionArea: number;
}

export interface CityStatisticsResponse {
  items: CityStatisticsItem[];
  totalCount: number;
  groupCount: number;
  success: boolean;
}
