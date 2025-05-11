import { useEffect } from "react";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import CityStatisticsSidebar from "./CityStatisticsSidebar";
import { clearSelection } from "@/store/map";
import { FiMapPin } from "react-icons/fi";

// Import TurkeyMap component dynamically
const TurkeyMap = dynamic(() => import("@/components/TurkeyMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex flex-col justify-center items-center bg-gray-50 rounded-md border border-gray-200">
      <div className="animate-pulse mb-4">
        <FiMapPin className="h-14 w-14 text-gray-300" />
      </div>
      <div className="text-gray-500 text-base mb-6">Harita yükleniyor...</div>
      <div className="w-64">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-5 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-5 bg-gray-200 rounded w-5/6 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded-full w-40 mx-auto mt-6"></div>
      </div>
    </div>
  ),
});

const MapLayout = () => {
  const dispatch = useDispatch();

  // Component unmount olduğunda state'i temizle
  useEffect(() => {
    // Cleanup function
    return () => {
      dispatch(clearSelection());
    };
  }, [dispatch]);

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
        <div className="h-[500px]">
          <TurkeyMap />
        </div>

        {/* City Statistics Sidebar - artık Redux ile kontrol ediliyor */}
        <CityStatisticsSidebar />
      </div>
    </div>
  );
};

export default MapLayout;
