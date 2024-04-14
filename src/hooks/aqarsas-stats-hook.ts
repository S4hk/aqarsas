import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";
import { ProcessedData, SelectedData } from "../types";
import { processData } from "../utils/processsData";
import { fetchBasedOnDateList } from "../utils/generateDateList";

interface Stats {
  [key: string]: ProcessedData[];
}
interface StatsState {
  [key: string]: Map<string, ProcessedData>;
}
const useAqarsasStats = (
  selectedData: SelectedData
): { stats: Stats | null; error: string | null; isFetching: boolean } => {
  const [stats, setStats] = useState<StatsState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async (
    date: string,
    stat_type: string = "number_of_deals"
  ) => {
    setIsFetching(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stat_type: stat_type,
          // calendar: "gregorian",
          start_date: date,
          end_date: date,
          key: API_KEY,
          state: Number(selectedData.state),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data.Error_code === 0) {
        setStats((prevStats) => {
          const newStats = new Map(prevStats ? prevStats[stat_type] : []);
          newStats.set(date, processData(date, data.Stats_list));
          return {
            ...prevStats,
            [stat_type]: newStats,
          };
        });
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
      setStats({});
      fetchBasedOnDateList(selectedData.date, fetchData);

      // fetchData("value_of_deals"); //TODO activate this if we need the deals values
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData]);

  return {
    stats: {
      number_of_deals: [...(stats?.number_of_deals?.values() || [])],
      //TODO activate this if we need the deals values
      // value_of_deals: processData(
      //   endDate,
      //   stats?.value_of_deals || []
      // ),
    },
    error,
    isFetching,
  };
};

export default useAqarsasStats;
