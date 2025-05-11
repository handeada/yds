export interface DistributionItem {
  id: number;
  dagitim_tarihi: number;
  havuzgrup: number;
  yibfid: number;
  belgeno: number;
  unvan: string;
  m2: number;
  ilid: number;
  il_name: string;
}

export type DistributionResponse = DistributionItem[];
