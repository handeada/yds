export type TabType =
  | "statistics"
  | "ydk"
  | "auditor"
  | "laboratory"
  | "ykeArchitectEngineer"
  | "controlWorker"
  | "siteSupervisor"
  | "distribution";

export const TAB_TITLES: Record<TabType, { value: number; title: string }> = {
  statistics: { value: 1, title: "İSTATİSTİKLER" },
  ydk: { value: 2, title: "YAPI DENETİM KURULUŞLARI" },
  laboratory: { value: 3, title: "LABORATUVARLAR" },
  auditor: { value: 4, title: "DENETÇİLER" },
  ykeArchitectEngineer: { value: 5, title: "YKE MİMAR/MÜHENDİS" },
  controlWorker: { value: 6, title: "YARDIMCI KONTROL ELEMANI" },
  siteSupervisor: { value: 7, title: "ŞANTİYE ŞEFİ" },
  distribution: { value: 8, title: "DAĞITIM LİSTESİ" },
};

export type LabTabType = "activeLaboratory" | "scopeList";

export const LAB_TAB_TITLES: Record<
  LabTabType,
  { value: number; title: string }
> = {
  activeLaboratory: { value: 1, title: "Aktif Laboratuvarlar" },
  scopeList: { value: 2, title: "Kapsam Listesi" },
};
