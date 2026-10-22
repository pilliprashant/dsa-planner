import { BarChart3 } from "lucide-react";

function AnalyticsHeader() {
  return (
    <div className="mb-8">

      {/* Heading */}
      <div className="flex items-center gap-3">

        <BarChart3
          size={34}
          className="text-blue-500"
        />

        <h1 className="text-4xl font-bold text-white">
          Analytics Dashboard
        </h1>

      </div>

      {/* Description */}
      <p className="mt-4 max-w-4xl text-lg text-slate-400 leading-8">
        Deep dive into your coding practice metrics, identify weak areas,
        and monitor spaced repetition consistency.
      </p>

    </div>
  );
}

export default AnalyticsHeader;