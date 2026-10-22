import { CalendarClock } from "lucide-react";

function RevisionsHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <CalendarClock
          className="text-blue-500"
          size={32}
        />

        <h1 className="text-4xl font-bold text-white">
          Spaced Repetition Deck
        </h1>
      </div>

      <p className="mt-4 text-lg text-slate-400">
        Review your solved questions at scientific intervals to move them
        from short-term to permanent long-term memory.
      </p>
    </div>
  );
}

export default RevisionsHeader;