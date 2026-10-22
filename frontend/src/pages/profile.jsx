import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileCard from "../components/profile/ProfileCard";
import AccountSettings from "../components/profile/AccountSettings";
import Preferences from "../components/profile/Preferences";

function Profile() {
  return (
    <div className="space-y-8">

      <ProfileHeader />

      <ProfileCard />

      <AccountSettings />

      <Preferences />

    </div>
  );
}

export default Profile;