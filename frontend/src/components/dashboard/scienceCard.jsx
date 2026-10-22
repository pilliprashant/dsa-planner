import { Brain, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
function ScienceCard() {
  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-7">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
          <Brain size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            The Science Behind It
          </h2>

          <p className="text-slate-400 text-sm">
            Why spaced repetition works
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-6 text-slate-300 leading-7">
        Research shows that reviewing information at increasing
        intervals significantly improves long-term retention and
        recall during interviews and coding assessments.
      </p>

      {/* Steps */}
      <div className="mt-8 space-y-4">

        <div className="flex gap-4">
          <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            1
          </div>

          <div>
            <h3 className="text-white font-semibold">
              Learn
            </h3>

            <p className="text-slate-400 text-sm">
              Solve and understand a new problem.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            2
          </div>

          <div>
            <h3 className="text-white font-semibold">
              Review
            </h3>

            <p className="text-slate-400 text-sm">
              Revisit the problem after a few days.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            3
          </div>

          <div>
            <h3 className="text-white font-semibold">
              Master
            </h3>

            <p className="text-slate-400 text-sm">
              Strengthen memory through repeated exposure.
            </p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <Link
  to="/revisions"
  className="
    mt-8
    flex
    items-center
    gap-2
    text-blue-500
    hover:text-blue-400
    transition
    font-medium
  "
>
  Explore Revision Deck
  <ArrowRight size={18} />
</Link>

    </div>
  );
}

export default ScienceCard;