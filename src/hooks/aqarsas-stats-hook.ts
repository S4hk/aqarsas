import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";
import { formatDateForAqarsas } from "../utils/formatDate";

interface Stats {
  number_of_deals?: number;
  value_of_deals?: number;
}

const useAqarsasStats = (
  endDate: Date
): { stats: Stats | null; error: string | null; isFetching: boolean } => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async (stat_type: string) => {
    setIsFetching(true);

    try {
      const startDate = formatDateForAqarsas(
        new Date(endDate.getFullYear(), endDate.getMonth(), 2)
      );

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stat_type,
          calendar: "gregorian",
          start_date: startDate,
          end_date: formatDateForAqarsas(endDate),
          key: API_KEY,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data.Error_code === 0) {
        setStats((prevStats) => ({
          ...prevStats,
          [stat_type]: data.Stats_list,
        }));
      } else {
        setError(data.Error_msg);
      }
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!isFetching) {
      fetchData("number_of_deals");
      fetchData("value_of_deals");
    }
  }, []);

  return { stats, error, isFetching };
};

export default useAqarsasStats;
