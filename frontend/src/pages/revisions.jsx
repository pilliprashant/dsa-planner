import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  completeRevision as completeRevisionAPI,
  delayRevision as delayRevisionAPI,
} from "../api/api";

import RevisionsHeader from "../components/revisions/revisionsHeader";
import SpacedRepetitionInfo from "../components/revisions/spacedRepitionInfo";
import RevisionFilters from "../components/revisions/revisionFilters";
import RevisionDeckCard from "../components/revisions/revisionDeckCard";
import StartRevisionModal from "../components/revisions/startRevisionModal";
import DelayRevisionModal from "../components/revisions/delayRevisionModal";
import CompletedRevisionLogs from "../components/revisions/completeRevisionLogs";

function Revisions() {
  const [activeTab, setActiveTab] = useState("due");
  const [search, setSearch] = useState("");

  const [selectedRevision, setSelectedRevision] = useState(null);
  const [showRevisionModal, setShowRevisionModal] = useState(false);

  const [showDelayModal, setShowDelayModal] = useState(false);
  const [selectedDelayRevision, setSelectedDelayRevision] = useState(null);

  const { questions } = useApp();
  const location = useLocation();

  // -----------------------------
  // Get revision status
  // -----------------------------
  const getRevisionStatus = (nextScheduled) => {
    if (!nextScheduled) return "Upcoming";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const scheduledDate = new Date(nextScheduled);
    scheduledDate.setHours(0, 0, 0, 0);

    if (scheduledDate < today) return "Overdue";

    if (scheduledDate.getTime() === today.getTime()) {
      return "Due Today";
    }

    return "Upcoming";
  };

  // -----------------------------
  // Build revision data
  // -----------------------------
  const revisions = questions
    .filter((q) => q.solved && q.revisionStage > 0)
    .map((q) => ({
      id: q._id,
      questionId: q._id,
      title: q.title,
      difficulty: q.difficulty,
      topic: q.topic,
      stage: q.revisionStage,
      revisionCount: q.revisionCount || 0,
      status: q.revisionCompleted
        ? "Completed"
        : getRevisionStatus(q.nextScheduled),
      nextScheduled: q.nextScheduled,
      note: q.description || "",
      revisionLogs: q.revisionLogs || [],
    }));

  // -----------------------------
  // Revision counts
  // -----------------------------
  const counts = {
    due: revisions.filter((r) => r.status === "Due Today").length,
    overdue: revisions.filter((r) => r.status === "Overdue").length,
    upcoming: revisions.filter((r) => r.status === "Upcoming").length,
    completed: revisions.filter((r) => r.status === "Completed").length,
  };

  // -----------------------------
  // Filter revisions
  // -----------------------------
  const filteredRevisions = revisions.filter((revision) => {
    const matchesSearch = revision.title
      .toLowerCase()
      .includes(search.toLowerCase());

    let matchesTab = false;

    switch (activeTab) {
      case "due":
        matchesTab = revision.status === "Due Today";
        break;

      case "overdue":
        matchesTab = revision.status === "Overdue";
        break;

      case "upcoming":
        matchesTab = revision.status === "Upcoming";
        break;

      case "completed":
        matchesTab = revision.status === "Completed";
        break;

      default:
        matchesTab = true;
    }

    return matchesSearch && matchesTab;
  });

  // -----------------------------
  // Delay revision
  // -----------------------------
  const delayRevision = async (days) => {
    if (!selectedDelayRevision) return;

    try {
      await delayRevisionAPI(
        selectedDelayRevision.questionId,
        days
      );

      setShowDelayModal(false);
      setSelectedDelayRevision(null);

      // Refresh data from backend
      window.location.reload();
    } catch (error) {
      console.error("Failed to delay revision:", error);
      alert(error.message);
    }
  };

  // -----------------------------
  // Complete revision
  // -----------------------------
  const completeRevision = async (revisionNotes) => {
    const currentRevision = selectedRevision;

    if (!currentRevision) return;

    try {
      await completeRevisionAPI(
        currentRevision.questionId,
        revisionNotes
      );

      setSelectedRevision(null);
      setShowRevisionModal(false);

      // Refresh data from backend
      window.location.reload();
    } catch (error) {
      console.error("Failed to complete revision:", error);
      alert(error.message);
    }
  };

  // -----------------------------
  // Open revision from Dashboard
  // -----------------------------
  useEffect(() => {
    const questionId = location.state?.questionId;

    if (!questionId) return;

    const question = questions.find(
      (q) => q._id === questionId
    );

    if (!question) return;

    const revision = {
      id: question._id,
      questionId: question._id,
      title: question.title,
      difficulty: question.difficulty,
      topic: question.topic,
      stage: question.revisionStage,
      revisionCount: question.revisionCount || 0,
      status: question.revisionCompleted
        ? "Completed"
        : getRevisionStatus(question.nextScheduled),
      nextScheduled: question.nextScheduled,
      note: question.description || "",
      revisionLogs: question.revisionLogs || [],
    };

    setSelectedRevision(revision);
    setShowRevisionModal(true);

    // Clear navigation state
    window.history.replaceState({}, document.title);
  }, [location.state, questions]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <RevisionsHeader />

      {/* Spaced repetition explanation */}
      <SpacedRepetitionInfo />

      {/* Filters */}
      <RevisionFilters
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        search={search}
        setSearch={setSearch}
        counts={counts}
      />

      {/* Completed tab */}
      {activeTab === "completed" ? (
        <CompletedRevisionLogs revisions={revisions} />
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {filteredRevisions.length > 0 ? (
            filteredRevisions.map((revision) => (
              <RevisionDeckCard
                key={revision.id}
                revision={revision}
                onStartRevision={(revision) => {
                  setSelectedRevision(revision);
                  setShowRevisionModal(true);
                }}
                onSkip={(revision) => {
                  setSelectedDelayRevision(revision);
                  setShowDelayModal(true);
                }}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-5 py-12 text-center sm:rounded-3xl sm:px-6">
              <h3 className="text-lg font-semibold text-white">
                No revisions found
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {search
                  ? "No revisions match your search."
                  : "There are no revisions in this category right now."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Start Revision Modal */}
      {showRevisionModal && selectedRevision && (
        <StartRevisionModal
          question={selectedRevision}
          onClose={() => {
            setSelectedRevision(null);
            setShowRevisionModal(false);
          }}
          onComplete={completeRevision}
        />
      )}

      {/* Delay Revision Modal */}
      {showDelayModal && selectedDelayRevision && (
        <DelayRevisionModal
          revision={selectedDelayRevision}
          onClose={() => {
            setSelectedDelayRevision(null);
            setShowDelayModal(false);
          }}
          onDelay={delayRevision}
        />
      )}
    </div>
  );
}

export default Revisions;