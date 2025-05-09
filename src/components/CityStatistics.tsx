import { CityStatisticsItem } from "@/services/api";

interface CityStatisticsProps {
  statistics: CityStatisticsItem[] | null;
  cityName: string | null;
  isLoading: boolean;
  error: string | null;
}

const CityStatistics: React.FC<CityStatisticsProps> = ({
  statistics,
  cityName,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="statistics-container" style={styles.loadingContainer}>
        <p>Veriler yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="statistics-container" style={styles.errorContainer}>
        <p>Hata: {error}</p>
      </div>
    );
  }

  if (!statistics || statistics.length === 0) {
    return (
      <div className="statistics-container" style={styles.emptyContainer}>
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
    <div className="statistics-container" style={styles.container}>
      <h2 style={styles.title}>{cityName} İli İstatistikleri</h2>
      <div style={styles.statsGrid}>
        {statsData.map((item) => (
          <div key={item.id} style={styles.statCard}>
            <h3 style={styles.statName}>{item.name}</h3>
            <p style={styles.statValue}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginTop: "20px",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center" as const,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
  },
  statCard: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "6px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease",
    cursor: "default",
  },
  statName: {
    fontSize: "1rem",
    fontWeight: "bold" as const,
    marginBottom: "8px",
    color: "#444",
  },
  statValue: {
    fontSize: "1.25rem",
    color: "#0066cc",
    fontWeight: "bold" as const,
  },
  loadingContainer: {
    padding: "20px",
    textAlign: "center" as const,
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    marginTop: "20px",
  },
  errorContainer: {
    padding: "20px",
    textAlign: "center" as const,
    backgroundColor: "#fff0f0",
    color: "#cc0000",
    borderRadius: "8px",
    marginTop: "20px",
  },
  emptyContainer: {
    padding: "20px",
    textAlign: "center" as const,
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    marginTop: "20px",
    color: "#666",
  },
};

export default CityStatistics;
