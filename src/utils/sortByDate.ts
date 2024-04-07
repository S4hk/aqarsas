import { ProcessedData } from "../types";

export function sortByDate(data: ProcessedData[]): ProcessedData[] {
  const compareDates = (a: ProcessedData, b: ProcessedData) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  };

  return data.sort(compareDates);
}
