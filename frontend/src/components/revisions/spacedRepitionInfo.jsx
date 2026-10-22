import { Brain, CalendarDays } from "lucide-react";

function SpacedRepetitionInfo() {
  const stages = [
    {
      stage: "Stage 1",
      day: "Day 7",
      color: "bg-blue-500",
    },
    {
      stage: "Stage 2",
      day: "Day 15",
      color: "bg-green-500",
    },
    {
      stage: "Stage 3",
      day: "Day 30",
      color: "bg-yellow-500",
    },
    {
      stage: "Stage 4+",
      day: "Day 60",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-[#0F172A] p-7">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10">
          <Brain className="text-blue-400" size={26} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Spaced Repetition Algorithm
          </h2>

          <p className="mt-1 text-slate-400">
            Scientifically optimized review intervals
            based on memory research.
          </p>
        </div>

      </div>

      {/* Stages */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-4">

        {stages.map((item) => (
          <div
            key={item.stage}
            className="rounded-2xl border border-slate-800 bg-[#020817] p-5"
          >

            <div
              className={`mb-4 h-3 w-3 rounded-full ${item.color}`}
            ></div>

            <h3 className="text-lg font-semibold text-white">
              {item.stage}
            </h3>

            <div className="mt-3 flex items-center gap-2">

              <CalendarDays
                size={18}
                className="text-slate-400"
              />

              <span className="text-slate-300">
                {item.day}
              </span>

            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Review after{" "}
              <span className="font-semibold text-white">
                {item.day}
              </span>{" "}
              to strengthen long-term memory retention.
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default SpacedRepetitionInfo;