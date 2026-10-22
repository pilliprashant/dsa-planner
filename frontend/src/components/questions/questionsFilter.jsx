import { Search, ArrowUpDown, Funnel } from "lucide-react";

function QuestionFilters({
  search,
  setSearch,
  difficulty,
  setDifficulty,
  topic,
  setTopic,
  sort,
  setSort,
}) {
  return (
    <div className="mt-4 rounded-3xl border border-slate-800 bg-[#0F172A] p-4 sm:p-6">
      {/* Search + Sort */}
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-slate-800
              py-3.5
              pl-12
              pr-4
              text-sm
              text-white
              placeholder:text-slate-500
              outline-none
              focus:border-blue-500
              sm:py-4
              sm:text-base
            "
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-[#111c32] px-4 sm:px-5">
          <ArrowUpDown
            size={18}
            className="shrink-0 text-slate-400"
          />

          <span className="shrink-0 text-sm text-slate-400">
            Sort:
          </span>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-gray-300 outline-none sm:py-4"
          >
            <option value="Date">Date</option>
            <option value="Title">Title</option>
            <option value="Difficulty">Difficulty</option>
            <option value="Revisions">Revisions</option>
          </select>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-slate-800 sm:my-6" />

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="flex items-center gap-2">
          <Funnel
            size={18}
            className="text-slate-400"
          />

          <span className="text-xs uppercase tracking-wider text-slate-400">
            Filters:
          </span>
        </div>

        {/* Difficulty */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-800
            px-4
            py-3
            text-sm
            text-white
            outline-none
            focus:border-blue-500
            sm:w-auto
          "
        >
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        {/* Topic */}
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-800
            px-4
            py-3
            text-sm
            text-white
            outline-none
            focus:border-blue-500
            sm:w-auto
          "
        >
          <option>All</option>
          <option>Arrays</option>
          <option>Strings</option>
          <option>Linked List</option>
          <option>Stack</option>
          <option>Queue</option>
          <option>Trees</option>
          <option>Graphs</option>
          <option>Heap</option>
          <option>DP</option>
        </select>
      </div>
    </div>
  );
}

export default QuestionFilters;