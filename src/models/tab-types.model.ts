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
  | "siteSupervisor";

/**
 * Tab tiplerine karşılık gelen başlıklar
 */
export const TAB_TITLES: Record<TabType, { value: number; title: string }> = {
  statistics: { value: 1, title: "İstatistikler" },
  ydk: { value: 2, title: "Yapı Denetim Kuruluşları" },
  auditor: { value: 3, title: "Denetçiler" },
  laboratory: { value: 4, title: "Laboratuvarlar" },
  ykeArchitectEngineer: { value: 5, title: "YKE MİMAR/MÜHENDİS" },
  controlWorker: { value: 6, title: "YARDIMCI KONTROL ELEMANI" },
  siteSupervisor: { value: 7, title: "ŞANTİYE ŞEFİ" },
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
