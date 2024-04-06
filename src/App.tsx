import React from "react";
import "./App.css";
import useAqarsasStats from "./hooks/aqarsas-stats-hook";
import ValuesChart from "./components/chart/ValuesChart";
import { processData } from "./utils/processsData";

interface AppProps {}
const App: React.FC<AppProps> = () => {
  const selectedDate = "2022-01-05";
  const { stats, error, isFetching } = useAqarsasStats(new Date(selectedDate));

  return (
    <div>
      {isFetching ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {console.log({
            number_of_deals: processData(selectedDate, stats?.number_of_deals),
          })}
          <p>Number of Deals: {stats?.number_of_deals?.length}</p>
          <p>Value of Deals: {stats?.value_of_deals?.length}</p>
          <ValuesChart />
        </div>
      )}
    </div>
  );
};

export default App;
