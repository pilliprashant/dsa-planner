import WelcomeBanner from "../components/dashboard/welcomeBanner";
import StatSection from "../components/dashboard/statSection";
import Readiness from "../components/dashboard/readinessCard";
import RevisionQueue from "../components/dashboard/revisionQueue";
import RecentActivity from "../components/dashboard/recentActivity";
import ScienceCard from "../components/dashboard/scienceCard";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#020817]">

      <WelcomeBanner />

      <StatSection />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 sm:gap-6 mt-6 sm:mt-8">

        <Readiness />

        <RevisionQueue />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">

        <RecentActivity />

        <ScienceCard />

      </div>

    </div>
  );
}

export default Dashboard;