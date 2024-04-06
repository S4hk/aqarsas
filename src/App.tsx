import React from "react";
import "./App.css";
import useAqarsasStats from "./hooks/aqarsas-stats-hook";
import ValuesChart from "./components/chart/ValuesChart";

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
          {console.log(stats)}

          {!!stats?.number_of_deals && (
            <ValuesChart processedData={[stats?.number_of_deals]} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
