// API çağrıları için servis fonksiyonları

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

export const fetchCityStatistics = async (
  plakaNo: number
): Promise<CityStatisticsItem[]> => {
  try {
    const response = await fetch(
      `https://businessyds.csb.gov.tr/api/department/findAllPublicStatistics/${plakaNo}`
    );

    if (!response.ok) {
      throw new Error(`API çağrısı başarısız oldu: ${response.status}`);
    }

    const data = (await response.json()) as CityStatisticsResponse;
    return data.items || [];
  } catch (error) {
    console.error("Veri çekme hatası:", error);
    throw error;
  }
};
