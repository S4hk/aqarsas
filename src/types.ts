export interface DataItem {
  Stat: number;
  Category: string;
  Dtype: string;
}

export interface ProcessedData {
  date: string;
  residential: number;
  commercial: number;
}

export interface SelectedData {
  date: string;
  state?: number;
}
