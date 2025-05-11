import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CityStatistics from "./CityStatistics";
import YdkTable from "./YdkTable";
import AuditorTable from "./AuditorTable";
import LaboratoryTabs from "./LaboratoryTabs";
import { useGetCityStatisticsQuery } from "@/services/department";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { closeSidebar, getSelectedCity, selectTab } from "@/store/map";
import { TAB_TITLES } from "@/models";
import { FiX } from "react-icons/fi";
import { SkeletonStatistics } from "./ui/Skeleton";

const CityStatisticsSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedCityPlate, selectedCityName, activeTab } =
    useSelector(getSelectedCity);

  // Fetch statistics for the selected city
  const {
    data: statistics,
    isLoading,
    isFetching,
    error: statsError,
  } = useGetCityStatisticsQuery(selectedCityPlate as number, {
    skip: !selectedCityPlate,
  });

  // Handle the sidebar close action
  const handleClose = () => {
    dispatch(closeSidebar());
  };

  return (
    <AnimatePresence>
      {selectedCityPlate && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 left-0 h-full w-full sm:w-[550px] md:w-[650px] lg:w-[750px] bg-white shadow-xl z-50 overflow-y-auto"
            style={{ overflowX: "hidden" }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <div className="p-4 sm:p-5">
              <div className="flex justify-between items-center mb-4 border-b pb-3">
                <h3 className="text-xl font-semibold truncate max-w-[calc(100%-40px)]">
                  {selectedCityName
                    ? `${selectedCityName} İl Verileri`
                    : "İl Verileri"}
                </h3>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                  aria-label="Kapat"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              {/* Tab navigation */}
              <div className="border-b border-gray-200 mb-4 overflow-x-auto scrollbar-hide">
                <nav
                  className="-mb-px flex space-x-1 sm:space-x-4 min-w-max"
                  aria-label="Tabs"
                >
                  {Object.values(TAB_TITLES).map(({ value, title }) => (
                    <button
                      key={value}
                      onClick={() => dispatch(selectTab(value))}
                      className={`${
                        activeTab === value
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      } whitespace-nowrap py-2 px-2 border-b-2 font-medium text-xs flex-shrink-0`}
                    >
                      {title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab content */}
              <div className="overflow-x-hidden">
                {activeTab === TAB_TITLES.statistics.value &&
                  (isLoading || isFetching ? (
                    <SkeletonStatistics />
                  ) : (
                    <CityStatistics
                      statistics={statistics}
                      cityName={selectedCityName || undefined}
                      error={
                        statsError
                          ? "Veriler yüklenirken bir hata oluştu."
                          : undefined
                      }
                    />
                  ))}

                {activeTab === TAB_TITLES.ydk.value && (
                  <YdkTable cityId={selectedCityPlate} />
                )}

                {activeTab === TAB_TITLES.auditor.value && (
                  <AuditorTable cityId={selectedCityPlate} />
                )}

                {activeTab === TAB_TITLES.laboratory.value && (
                  <LaboratoryTabs />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CityStatisticsSidebar;
