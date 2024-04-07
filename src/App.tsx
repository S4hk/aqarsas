import React, { useState } from "react";
import "./App.css";
import useAqarsasStats from "./hooks/aqarsas-stats-hook";
import ValuesChart from "./components/chart/ValuesChart";
import Warning from "./components/alert/Warning";
import FilterForm from "./components/filter/FilterForm";
import { SelectedData } from "./types";
const areas = [
  "جميع المناطق",
  "الرياض",
  "مكة المكرمة",
  "المدينة المنورة",
  "القصيم",
  "الشرقية",
  "عسير",
  "تبوك",
  "حائل",
  "الحدود الشمالية",
  "جازان",
  "نجران",
  "الباحة",
  "الجوف",
];

const App: React.FC = () => {
  const [selectedData, setSelectedData] = useState<SelectedData>({
    date: "2022-01-05",
  });
  const { stats, error, isFetching } = useAqarsasStats(selectedData);
  return (
    <div className="container mx-auto p-4 font-tajawal  flex justify-center   flex-col items-center ">
      <h1 className="text-center fw-bold mb-12 text-4xl">رسم بياني تفاعلي</h1>

      <div className="flex  gap-5 mb-6 flex-col md:flex-row">
        <div>
          <strong>خيارات البحث: </strong>
          {Number(selectedData?.state) + 1
            ? areas[Number(selectedData?.state) + 1]
            : areas[0]}
        </div>
        <div>
          <strong> للفترة الزمنية : </strong>
          يوم {selectedData?.date}
        </div>
      </div>
      <FilterForm setSelectedData={setSelectedData} />
      <h5 className="my-5">
        مقارنة <strong>عدد الصفقات</strong> بالفترة المماثلة من الأعوام الماضية
      </h5>
      {isFetching ? (
        <div className="animate-pulse flex my-4">
          <div className=" bg-slate-300 h-[260px] w-[40vw]"></div>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="flex lg:w-1/2  w-full" dir="ltr">
          {!!stats?.number_of_deals && (
            <ValuesChart processedData={stats?.number_of_deals || []} />
          )}
        </div>
      )}
      <div className="mt-4">
        <Warning />
      </div>
    </div>
  );
};

export default App;
