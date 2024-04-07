import React, { useState } from "react";
import "./App.css";
import useAqarsasStats from "./hooks/aqarsas-stats-hook";
import ValuesChart from "./components/chart/ValuesChart";
import Warning from "./components/alert/Warning";
import FilterForm from "./components/filter/FilterForm";

interface AppProps {}
const App: React.FC<AppProps> = () => {
  const [selectedData, setSelectedData] = useState({
    date: "2022-01-05",
  });
  const { stats, error, isFetching } = useAqarsasStats(selectedData);
  return (
    <div className="container mx-auto p-4  flex justify-center   flex-col items-center ">
      <h1 className="text-center fw-bold mb-5 text-4xl">رسم بياني تفاعلي</h1>
      <FilterForm setSelectedData={setSelectedData} />

      {isFetching ? (
        <div className="animate-pulse flex my-4">
          <div className=" bg-slate-300 h-[260px] w-[40vw]"></div>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <div dir="ltr">
            {!!stats?.number_of_deals && (
              <ValuesChart processedData={stats?.number_of_deals || []} />
            )}
          </div>
        </div>
      )}
      <div className="mt-4">
        <Warning />
      </div>
    </div>
  );
};

export default App;
