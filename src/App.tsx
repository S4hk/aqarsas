import React from "react";
import "./App.css";
import useAqarsasStats from "./hooks/aqarsas-stats-hook";
import ValuesChart from "./components/chart/ValuesChart";
import Warning from "./components/alert/Warning";
import FilterForm from "./components/filter/FilterForm";

interface AppProps {}
const App: React.FC<AppProps> = () => {
  const selectedDate = "2011-01-05";
  const { stats, error, isFetching } = useAqarsasStats(selectedDate);
  return (
    <div className="container mx-auto p-4  flex justify-center">
      {isFetching ? (
        <div role="status" className="max-w-full animate-pulse">
          <div className=" bg-gray-200 l dark:bg-gray  mb-4 h-[300px]"></div>

          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h1 className="text-center fw-bold mb-5 text-4xl">
            رسم بياني تفاعلي
          </h1>
          <FilterForm />
          <div dir="ltr">
            {!!stats?.number_of_deals && (
              <ValuesChart
                processedData={stats?.number_of_deals || ([] as Array)}
              />
            )}
          </div>
          <div className="mt-4">
            <Warning />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
