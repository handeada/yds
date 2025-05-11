import { FiMap, FiMapPin } from "react-icons/fi";

export const MapSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-sm border border-gray-100 max-w-md">
        <div className="animate-pulse mb-5">
          <FiMap className="h-16 w-16 text-gray-300" />
        </div>
        <div className="text-gray-600 text-lg font-medium mb-6">
          Türkiye İl İstatistikleri
        </div>
        <div className="text-gray-500 mb-6">Harita yükleniyor...</div>
        <div className="w-full space-y-3">
          <div className="h-5 bg-gray-200 rounded w-full"></div>
          <div className="h-5 bg-gray-200 rounded w-5/6 mx-auto"></div>
          <div className="h-5 bg-gray-200 rounded w-4/5 mx-auto"></div>
        </div>
        <div className="mt-8 h-10 bg-blue-100 rounded-full w-40 mx-auto"></div>
      </div>
    </div>
  );
};

export const TurkeyMapSkeleton = () => {
  return (
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
  );
};
