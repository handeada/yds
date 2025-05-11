import { useEffect } from "react";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import CityStatisticsSidebar from "./CityStatisticsSidebar";
import { clearSelection } from "@/store/map";
import { TurkeyMapSkeleton } from "@/components/ui/Skeletons";

// Import TurkeyMap component dynamically
const TurkeyMap = dynamic(() => import("@/components/TurkeyMap"), {
  ssr: false,
  loading: () => <TurkeyMapSkeleton />,
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

        <div className="h-[500px]">
          <TurkeyMap />
        </div>

        <CityStatisticsSidebar />
      </div>
    </div>
  );
};

export default MapLayout;
