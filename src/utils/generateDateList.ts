export function fetchBasedOnDateList(
  baseDateStr: string,
  action: (date: string) => void
) {
  const baseDate = new Date(baseDateStr);
  const year = baseDate.getFullYear();
  let currentYear = year;
  while (currentYear >= 2009) {
    baseDate.setFullYear(currentYear);
    action(baseDate.toISOString().slice(0, 10));
    currentYear--;
  }
}
