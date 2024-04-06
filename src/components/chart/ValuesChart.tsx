import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ProcessedData } from "../../types";


export default function ValuesChart({
  processedData,
}: {
  processedData: ProcessedData[];
}): JSX.Element {
  return (
    <>
      <BarChart
        width={500}
        height={300}
        data={processedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="residential" stackId="a" fill="#1e1350" />
        <Bar dataKey="commercial" stackId="a" fill="#0046ff" />
      </BarChart>
    </>
  );
}
