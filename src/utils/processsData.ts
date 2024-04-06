import { DataItem, ProcessedData } from "../types";

export const processData = (
  dateString: string,
  data: DataItem[]
): ProcessedData => {
  const result: ProcessedData = {
    date: dateString,
    residential: 0,
    commercial: 0,
  };

  data?.forEach((item) => {
    if (item.Dtype === "سكني") {
      result.residential += item.Stat;
    } else if (item.Dtype === "تجاري") {
      result.commercial += item.Stat;
    }
  });

  return result;
};
