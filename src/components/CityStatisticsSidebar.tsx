import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CityStatistics from "./CityStatistics";
import YdkTable from "./YdkTable";
import AuditorTable from "./AuditorTable";
import { useGetCityStatisticsQuery } from "@/services/department";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { closeSidebar, getSelectedCity, selectTab } from "@/store/map";
import { TAB_TITLES } from "@/models";

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

  // Skeleton loading UI
  const SkeletonLoading = () => (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
    </div>
  );

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
                <h3 className="text-xl font-semibold">
                  {selectedCityName
                    ? `${selectedCityName} İl Verileri`
                    : "İl Verileri"}
                </h3>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Kapat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Tab navigation */}
              <div className="border-b border-gray-200 mb-4">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {Object.values(TAB_TITLES).map(({ value, title }) => (
                    <button
                      key={value}
                      onClick={() => dispatch(selectTab(value))}
                      className={`${
                        activeTab === value
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                    >
                      {title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab content */}
              {activeTab === TAB_TITLES.statistics.value &&
                (isLoading || isFetching ? (
                  <SkeletonLoading />
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CityStatisticsSidebar;
