import {
  Clock3,
  TriangleAlert,
  CalendarClock,
  History,
  Search,
} from "lucide-react";

function RevisionFilters({
  activeTab,
  setActiveTab,
  search,
  setSearch,
  counts,
}) {
  const tabs = [
    {
      id: "due",
      title: "Due Today",
      shortTitle: "Due",
      icon: Clock3,
      badgeColor: "bg-blue-900 text-blue-300",
      count: counts.due,
    },
    {
      id: "overdue",
      title: "Overdue",
      shortTitle: "Overdue",
      icon: TriangleAlert,
      badgeColor: "bg-red-900 text-red-300",
      count: counts.overdue,
    },
    {
      id: "upcoming",
      title: "Upcoming",
      shortTitle: "Upcoming",
      icon: CalendarClock,
      badgeColor: "bg-slate-700 text-slate-300",
      count: counts.upcoming,
    },
    {
      id: "completed",
      title: "Completed Logs",
      shortTitle: "Completed",
      icon: History,
      badgeColor: "bg-green-900 text-green-300",
      count: counts.completed,
    },
  ];

  return (
    <div className="mt-8 border-b border-slate-800 pb-4">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2 lg:gap-5">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 transition-all sm:rounded-none sm:border-0 sm:border-b-2 sm:bg-transparent sm:px-2 sm:pb-4 ${
                  activeTab === tab.id
                    ? "border-blue-500 bg-blue-500/10 text-blue-400 sm:bg-transparent"
                    : "border-transparent bg-slate-900/50 text-slate-400 hover:text-white sm:bg-transparent"
                }`}
              >
                <Icon size={18} />

                <span className="hidden font-medium sm:inline">
                  {tab.title}
                </span>

                <span className="font-medium sm:hidden">
                  {tab.shortTitle}
                </span>

                <span
                  className={`flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-xs font-semibold ${tab.badgeColor}`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full xl:w-80">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search in deck..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-slate-800
              py-3
              pl-11
              pr-4
              text-sm
              text-white
              placeholder:text-slate-500
              outline-none
              focus:border-blue-500
            "
          />
        </div>
      </div>
    </div>
  );
}

export default RevisionFilters;