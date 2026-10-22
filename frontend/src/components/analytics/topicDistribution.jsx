import { BarChart3 } from "lucide-react";
import ChartCard from "./ChartCard";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useApp } from "../../context/AppContext";

function TopicDistribution() {
  const { questions } = useApp();

  // Count solved questions by topic
  const topicCounts = {};

  questions.forEach((question) => {
    if (!question.solved) return;

    if (!topicCounts[question.topic]) {
      topicCounts[question.topic] = 0;
    }

    topicCounts[question.topic]++;
  });

  const data = Object.entries(topicCounts).map(
    ([topic, solved]) => ({
      topic,
      solved,
    })
  );

  return (
    <ChartCard
      title="Topic Distribution"
      icon={<BarChart3 size={20} />}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={data}>

          <CartesianGrid
            stroke="#334155"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="topic"
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
              color: "#FFFFFF",
            }}
            labelStyle={{
              color: "#FFFFFF",
              fontWeight: 600,
            }}
            itemStyle={{
              color: "#FFFFFF",
            }}
            cursor={{
              fill: "rgba(37, 99, 235, 0.15)",
            }}
          />

          <Bar
            dataKey="solved"
            radius={[8, 8, 0, 0]}
            fill="#2563EB"
          />

        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default TopicDistribution;