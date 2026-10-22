import { PieChart as PieChartIcon } from "lucide-react";
import ChartCard from "./chartCard";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { useApp } from "../../context/AppContext";

const COLORS = [
  "#22C55E",
  "#FACC15",
  "#EF4444",
];

function DifficultyBreakdown() {
  const { questions } = useApp();

  // -----------------------------
  // Count solved questions
  // -----------------------------
  const solvedQuestions = questions.filter(
    (question) => question.solved === true
  );

  // -----------------------------
  // Difficulty Breakdown
  // -----------------------------
  const data = [
    {
      name: "Easy",
      value: solvedQuestions.filter(
        (question) =>
          question.difficulty?.toLowerCase() === "easy"
      ).length,
    },

    {
      name: "Medium",
      value: solvedQuestions.filter(
        (question) =>
          question.difficulty?.toLowerCase() === "medium"
      ).length,
    },

    {
      name: "Hard",
      value: solvedQuestions.filter(
        (question) =>
          question.difficulty?.toLowerCase() === "hard"
      ).length,
    },
  ];

  return (
    <ChartCard
      title="Difficulty Breakdown"
      icon={<PieChartIcon size={20} />}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={95}
            innerRadius={55}
            paddingAngle={4}
            label={({ percent }) =>
              `${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#0F172A",
              border: "1px solid #334155",
              borderRadius: "12px",
            }}
            labelStyle={{
              color: "#fff",
            }}
            itemStyle={{
              color: "#fff",
            }}
          />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{
              color: "#CBD5E1",
              paddingTop: "20px",
            }}
          />

        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default DifficultyBreakdown;