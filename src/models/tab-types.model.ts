/**
 * Sidebar'da kullanılan tab tipleri
 */
export type TabType = "statistics" | "ydk" | "auditor";

/**
 * Tab tiplerine karşılık gelen başlıklar
 */
export const TAB_TITLES: Record<TabType, { value: number; title: string }> = {
  statistics: { value: 1, title: "İstatistikler" },
  ydk: { value: 2, title: "Yapı Denetim Kuruluşları" },
  auditor: { value: 3, title: "Denetçiler" },
};
