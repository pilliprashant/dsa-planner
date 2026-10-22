function QuestionsHeader({ setShowAddModal }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          Question Repository
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-3 sm:text-base">
          Manage your solved DSA questions, review schedule,
          and performance notes.
        </p>
      </div>

      <button
        onClick={() => setShowAddModal(true)}
        className="
          w-full
          rounded-2xl
          bg-blue-600
          px-6
          py-3.5
          text-sm
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-blue-700
          sm:w-auto
          sm:px-7
          sm:py-4
        "
      >
        + Add Question
      </button>
    </div>
  );
}

export default QuestionsHeader;