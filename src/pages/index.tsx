import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout, selectAuth } from "@/store/auth";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const MapLayout = dynamic(() => import("@/components/MapLayout"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-pulse">Harita yükleniyor...</div>
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
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition duration-200"
          >
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
