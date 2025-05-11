/**
 * Sidebar'da kullanılan tab tipleri
 */
export type TabType =
  | "statistics"
  | "ydk"
  | "auditor"
  | "laboratory"
  | "ykeArchitectEngineer"
  | "controlWorker"
  | "siteSupervisor"
  | "distribution";

/**
 * Tab tiplerine karşılık gelen başlıklar
 */
export const TAB_TITLES: Record<TabType, { value: number; title: string }> = {
  statistics: { value: 1, title: "İSTATİSTİKLER" },
  ydk: { value: 2, title: "YAPI DENETİM KURULUŞLARI" },
  auditor: { value: 3, title: "DENETÇİLER" },
  laboratory: { value: 4, title: "LABORATUVARLAR" },
  ykeArchitectEngineer: { value: 5, title: "YKE MİMAR/MÜHENDİS" },
  controlWorker: { value: 6, title: "YARDIMCI KONTROL ELEMANI" },
  siteSupervisor: { value: 7, title: "ŞANTİYE ŞEFİ" },
  distribution: { value: 8, title: "DENETÇİ LİSTESİ" },
};

/**
 * Laboratory tab tipleri
 */
export type LabTabType = "activeLaboratory" | "scopeList";

/**
 * Laboratory tab tiplerine karşılık gelen başlıklar
 */
export const LAB_TAB_TITLES: Record<
  LabTabType,
  { value: number; title: string }
> = {
  activeLaboratory: { value: 1, title: "Aktif Laboratuvarlar" },
  scopeList: { value: 2, title: "Kapsam Listesi" },
};
