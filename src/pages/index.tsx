import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  selectUser,
  selectIsLoading,
  logout,
  selectIsInitialized,
} from "@/redux/authSlice";
import dynamic from "next/dynamic";
import { fetchCityStatistics, CityStatisticsItem } from "@/services/api";
import { turkeyProvinces } from "@/data/turkey-provinces";
import CityStatisticsComponent from "@/components/CityStatistics";

// MapLibre GL JS tarayıcı ortamında çalıştığı için dinamik import kullanıyoruz
const TurkeyMap = dynamic(() => import("@/components/TurkeyMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      Harita yükleniyor...
    </div>
  ),
});

export default function Home() {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);
  const isInitialized = useAppSelector(selectIsInitialized);
  const dispatch = useAppDispatch();

  // İl seçimi ve istatistik durumları
  const [selectedCityPlate, setSelectedCityPlate] = useState<number | null>(
    null
  );
  const [selectedCityName, setSelectedCityName] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<CityStatisticsItem[] | null>(
    null
  );
  const [statsLoading, setStatsLoading] = useState<boolean>(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    // Eğer sistem başlatıldıysa ve kullanıcı giriş yapmamışsa, login sayfasına yönlendir
    if (isInitialized && !user) {
      router.push("/login");
    }
  }, [user, isInitialized, router]);

  // İl verilerini getir - useCallback ile sararak referans kararlılığı sağlar
  const fetchCityData = useCallback(async (plateNo: number) => {
    setStatsLoading(true);
    setStatsError(null);

    try {
      const data = await fetchCityStatistics(plateNo);
      setStatistics(data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      setStatsError("Veriler yüklenirken bir hata oluştu.");
      setStatistics(null);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // İl seçildiğinde istatistikleri getir
  useEffect(() => {
    if (selectedCityPlate) {
      const cityName =
        turkeyProvinces.features.find(
          (f) => f.properties.plate === selectedCityPlate
        )?.properties.name || null;

      setSelectedCityName(cityName);
      fetchCityData(selectedCityPlate);
    }
  }, [selectedCityPlate, fetchCityData]);

  // İl seçim fonksiyonu - useCallback ile sararak referans kararlılığı sağlar
  const handleCitySelect = useCallback(
    (plateNo: number) => {
      // Aynı şehir tekrar seçildiyse tekrar yükleme yapma
      if (plateNo !== selectedCityPlate) {
        setSelectedCityPlate(plateNo);
      }
    },
    [selectedCityPlate]
  );

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  // Sistem başlatılmadıysa veya yükleniyor durumundaysa
  if (!isInitialized || isLoading) {
    return <div>Yükleniyor...</div>;
  }

  // Kullanıcı giriş yapmamışsa
  if (!user) {
    return <div>Yönlendiriliyor...</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>Türkiye İl İstatistikleri</h1>
        <div>
          <span style={{ marginRight: "1rem" }}>
            Hoş geldiniz, {user.username}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Çıkış Yap
          </button>
        </div>
      </header>
      <main>
        <section>
          <h2>Türkiye Haritası</h2>
          <p>İstatistiklerini görmek istediğiniz ili seçin.</p>
          <TurkeyMap onCitySelect={handleCitySelect} />
        </section>

        <section style={{ marginTop: "2rem" }}>
          <CityStatisticsComponent
            statistics={statistics}
            cityName={selectedCityName}
            isLoading={statsLoading}
            error={statsError}
          />
        </section>
      </main>
    </div>
  );
}
