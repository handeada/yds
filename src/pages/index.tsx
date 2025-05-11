import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout, selectAuth } from "@/store/auth";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { FiLogOut, FiMap } from "react-icons/fi";

const MapLayout = dynamic(() => import("@/components/MapLayout"), {
  ssr: false,
  loading: () => (
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
  ),
});

export default function Home() {
  const { user } = useSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen">
      <header className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-white">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Türkiye İl İstatistikleri
        </h1>
        <div className="flex items-center">
          <span className="mr-4 hidden sm:inline">
            Hoş geldiniz, {user.username}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium flex items-center transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <FiLogOut className="h-4 w-4 mr-2" />
            Çıkış Yap
          </button>
        </div>
      </header>

      <main className="h-[calc(100vh-73px)]">
        <MapLayout />
      </main>
    </div>
  );
}

// Ana sayfa kimlik doğrulama gerektirir (varsayılan olarak true olduğu için eklenmesine gerek yok)
Home.requireAuth = true;
