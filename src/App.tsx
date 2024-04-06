import React from "react";
import "./App.css";
import useAqarsasStats from "./hooks/aqarsas-stats-hook";
import ValuesChart from "./components/chart/ValuesChart";
import Warning from "./components/alert/Warning";

interface AppProps {}
const App: React.FC<AppProps> = () => {
  const selectedDate = "2022-01-05";
  const { stats, error, isFetching } = useAqarsasStats(selectedDate);
  return (
    <div className="container mx-auto p-4">
      {isFetching ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <div dir="ltr" className="flex justify-center">
            {!!stats?.number_of_deals && (
              <ValuesChart processedData={stats?.number_of_deals || []} />
            )}
          </div>
          <div>
          <Warning />
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
