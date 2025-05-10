import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useGetCityStatisticsQuery } from "@/services/city-statistics";
import { turkeyProvinces } from "@/constants/turkey-provinces";
import CityStatistics from "./CityStatistics";

// Import TurkeyMap component dynamically
const TurkeyMap = dynamic(() => import("@/components/TurkeyMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex justify-center items-center bg-gray-50 rounded-md">
      Harita yükleniyor...
    </div>
  ),
});

const MapLayout: React.FC = () => {
  // State for selected city
  const [selectedCityPlate, setSelectedCityPlate] = useState<number | null>(
    null
  );
  const [selectedCityName, setSelectedCityName] = useState<string | null>(null);

  // Fetch statistics for the selected city
  const {
    data: statistics,
    isLoading: statsLoading,
    error: statsError,
  } = useGetCityStatisticsQuery(selectedCityPlate || 0, {
    skip: !selectedCityPlate,
  });

  // City selection handler
  const handleCitySelect = useCallback((plateNo: number) => {
    // Find the city name
    const cityName =
      turkeyProvinces.features.find((f) => f.properties.plate === plateNo)
        ?.properties.name || null;

    setSelectedCityPlate(plateNo);
    setSelectedCityName(cityName);
  }, []);

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Türkiye Haritası</h2>
          <p className="text-gray-600 mb-2">
            İstatistiklerini görmek istediğiniz ili seçin.
          </p>
        </div>

        {/* Map component */}
        <div className="h-[500px] mb-6">
          <TurkeyMap onCitySelect={handleCitySelect} />
        </div>

        {/* City Statistics */}
        <CityStatistics
          statistics={statistics}
          cityName={selectedCityName || undefined}
          isLoading={statsLoading}
          error={
            statsError ? "Veriler yüklenirken bir hata oluştu." : undefined
          }
        />
      </div>
    </div>
  );
};

export default MapLayout;
