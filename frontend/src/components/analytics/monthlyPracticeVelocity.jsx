import { TrendingUp } from "lucide-react";
import ChartCard from "./chartCard";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useApp } from "../../context/AppContext";

function MonthlyPracticeVelocity() {
  const { questions } = useApp();

  const currentDate = new Date();

  // Create the last 7 months
  const data = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - (6 - index),
      1
    );

    const year = date.getFullYear();
    const month = date.getMonth();

    const solved = questions.filter((question) => {
      if (!question.solved || !question.solvedAt) {
        return false;
      }

      const solvedDate = new Date(question.solvedAt);

      return (
        solvedDate.getFullYear() === year &&
        solvedDate.getMonth() === month
      );
    }).length;

    return {
      month: date.toLocaleString("default", {
        month: "short",
      }),
      solved,
    };
  });

  return (
    <ChartCard
      title="Monthly Practice Velocity"
      icon={<TrendingUp size={20} />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>

          <CartesianGrid
            stroke="#334155"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
            stroke="#94A3B8"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            stroke="#94A3B8"
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0F172A",
              border: "1px solid #334155",
              borderRadius: "12px",
            }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            cursor={{
              stroke: "#2563EB",
              strokeWidth: 1,
            }}
          />

          <Line
            type="monotone"
            dataKey="solved"
            stroke="#2563EB"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#2563EB",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 7,
            }}
          />

        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default MonthlyPracticeVelocity;