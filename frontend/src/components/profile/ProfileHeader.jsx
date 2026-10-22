import { UserRound } from "lucide-react";

function ProfileHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <UserRound
          size={30}
          className="text-blue-500"
        />

        <h1 className="text-3xl font-bold text-white">
          Profile Settings
        </h1>
      </div>

      <p className="mt-2 text-base text-slate-400">
        Manage your profile, account information, and preferences.
      </p>
    </div>
  );
}

export default ProfileHeader;