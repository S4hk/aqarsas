import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ProcessedData } from "../../types";

export default function ValuesChart({
  processedData,
}: {
  processedData: ProcessedData[];
}): JSX.Element {
  return (
    <ResponsiveContainer width="95%" height={300}>
      <BarChart
        width={700}
        height={300}
        data={processedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          //interval={6}//we can change it to 0 to view all dates
        />
        <YAxis
          tickFormatter={(value) =>
            new Intl.NumberFormat("ar-EG", {
              notation: "compact",
              compactDisplay: "short",
            }).format(value)
          }
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="residential" name="سكني" stackId="a" fill="#1e1350" />
        <Bar dataKey="commercial" name="تجاري" stackId="a" fill="#0046ff" />
      </BarChart>
    </ResponsiveContainer>
  );
}
