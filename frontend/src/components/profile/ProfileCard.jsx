import { useState } from "react";
import {
  UserRound,
  Flame,
  Code2,
  Pencil,
} from "lucide-react";

import EditProfileModal from "./EditProfileModal";
import { useApp } from "../../context/AppContext";


function ProfileCard() {
const { questions, user, updateUser } = useApp();

  const questionsSolved = questions.filter(
    (question) => question.solved
  ).length;

  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">

        {/* Profile Info */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-5">

            {/* Avatar */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600">
              <UserRound
                size={36}
                className="text-white"
              />
            </div>

            {/* Name & Email */}
            <div>
              <h2 className="text-2xl font-bold text-white">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {user.email}
              </p>
            </div>

          </div>

          {/* Edit Button */}
          <button
            type="button"
            onClick={() => setShowEditModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
          >
            <Pencil size={16} />
            Edit Profile
          </button>

        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Streak */}
          <div className="rounded-2xl bg-slate-900/70 p-4">
            <div className="flex items-center gap-3">

              <Flame
                size={20}
                className="text-orange-400"
              />

              <div>
                <p className="text-xs font-medium text-slate-500">
                  CURRENT STREAK
                </p>

                <p className="mt-1 text-xl font-bold text-white">
                  {user.streak} days
                </p>
              </div>

            </div>
          </div>

          {/* Questions */}
          <div className="rounded-2xl bg-slate-900/70 p-4">
            <div className="flex items-center gap-3">

              <Code2
                size={20}
                className="text-blue-400"
              />

              <div>
                <p className="text-xs font-medium text-slate-500">
                  QUESTIONS SOLVED
                </p>

                <p className="mt-1 text-xl font-bold text-white">
                  {questionsSolved}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedUser) => {
  updateUser(updatedUser);
  setShowEditModal(false);
}}
        />
      )}
    </>
  );
}

export default ProfileCard;