import { RefreshCcw } from "lucide-react";
import ChartCard from "./ChartCard";

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

function RevisionConsistency() {
  const { questions } = useApp();

  const today = new Date();

  // Create the last 7 weeks
  const data = Array.from({ length: 7 }, (_, index) => {
    const weekStart = new Date(today);

    weekStart.setDate(
      today.getDate() - (6 - index) * 7
    );

    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);

    weekEnd.setDate(weekStart.getDate() + 7);

    const revisions = questions.reduce(
      (total, question) => {
        const logs = question.revisionLogs || [];

        const weekRevisions = logs.filter((log) => {
          const revisionDate = new Date(log.date);

          return (
            revisionDate >= weekStart &&
            revisionDate < weekEnd
          );
        }).length;

        return total + weekRevisions;
      },
      0
    );

    return {
      week: `Week ${index + 1}`,
      revisions,
    };
  });

  return (
    <ChartCard
      title="Revision Consistency"
      icon={<RefreshCcw size={20} />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>

          <CartesianGrid
            stroke="#334155"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="week"
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
              stroke: "#10B981",
              strokeWidth: 1,
            }}
          />

          <Line
            type="monotone"
            dataKey="revisions"
            stroke="#10B981"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#10B981",
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

export default RevisionConsistency;