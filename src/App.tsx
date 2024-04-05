import React from "react";
import "./App.css";
import useAqarsasStats from "./hooks/aqarsas-stats-hook";
import ValuesChart from "./components/chart/ValuesChart";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const { stats, error, isFetching } = useAqarsasStats(new Date("2022-03-05"));

  return (
    <div>
      {isFetching ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {console.log({ stats })}
          <p>Number of Deals: {stats?.number_of_deals?.length}</p>
          <p>Value of Deals: {stats?.value_of_deals?.length}</p>
          <ValuesChart />
        </div>
      )}
    </div>
  );
};

export default App;
