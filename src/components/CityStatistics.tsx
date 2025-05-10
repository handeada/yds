import { CityStatisticsItem } from "@/models/city-statistics";

type CityStatisticsProps = {
  statistics?: CityStatisticsItem[];
  cityName?: string;
  isLoading: boolean;
  error?: string;
};

const CityStatistics: React.FC<CityStatisticsProps> = ({
  statistics,
  cityName,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="p-6 text-center bg-gray-50 rounded-md mt-4">
        <p>Veriler yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center bg-red-50 text-error rounded-md mt-4">
        <p>Hata: {error}</p>
      </div>
    );
  }

  if (!statistics || statistics.length === 0) {
    return (
      <div className="p-6 text-center bg-gray-50 rounded-md mt-4 text-gray-600">
        <p>
          {cityName
            ? `${cityName} ili için veri bulunamadı.`
            : "Lütfen haritadan bir il seçin."}
        </p>
      </div>
    );
  }

  // İlk istatistik öğesini al
  const stat = statistics[0];

  // İstatistikleri daha anlaşılır formatta göstermek için
  const statsData = [
    {
      id: 1,
      name: "Toplam YİBF Sayısı",
      value: stat.countTotalYibf.toLocaleString("tr-TR"),
    },
    {
      id: 2,
      name: "Toplam İnşaat Alanı (m²)",
      value: stat.countTotalConstructionArea.toLocaleString("tr-TR"),
    },
    {
      id: 3,
      name: "Aktif YDK Sayısı",
      value: stat.countTotalActiveYdk.toLocaleString("tr-TR"),
    },
    {
      id: 4,
      name: "Aktif Laboratuvar Sayısı",
      value: stat.countTotalActiveLab.toLocaleString("tr-TR"),
    },
    {
      id: 5,
      name: "Ülke Geneli YİBF Sayısı",
      value: stat.countTotalCountryYibf.toLocaleString("tr-TR"),
    },
    {
      id: 6,
      name: "Ülke Geneli İnşaat Alanı (m²)",
      value: stat.countTotalCountryConstructionArea.toLocaleString("tr-TR"),
    },
  ];

  return (
    <div className="p-5 bg-gray-50 rounded-md shadow mt-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-5 text-center text-gray-800">
        {cityName} İli İstatistikleri
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsData.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow duration-200 cursor-default"
          >
            <h3 className="text-sm font-bold mb-2 text-gray-700">
              {item.name}
            </h3>
            <p className="text-lg font-bold text-primary-500">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityStatistics;
