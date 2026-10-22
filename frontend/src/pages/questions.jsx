import { useState } from "react";

import QuestionsHeader from "../components/questions/questionsHeader";
import { useApp } from "../context/AppContext";

import QuestionFilters from "../components/questions/questionsFilter";
import QuestionsTable from "../components/questions/questionsTable";
import QuestionDetailsModal from "../components/questions/questionDetailsModal";
import QuestionFormModal from "../components/questions/questionFormModal";

function Questions() {
const {
  questions,
  addQuestion,
  markAsSolved,
  updateQuestion,
  updateRevisionDateForQuestion,
  deleteQuestion,
  questionsLoading,
  questionsError,
} = useApp();

  // -----------------------------
  // Modal State
  // -----------------------------
  const [showAddModal, setShowAddModal] =
    useState(false);

  const [selectedQuestion, setSelectedQuestion] =
    useState(null);

  const [editingQuestion, setEditingQuestion] =
    useState(null);

  // -----------------------------
  // Filters
  // -----------------------------
  const [search, setSearch] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("All");

  const [topic, setTopic] =
    useState("All");

  const [sort, setSort] =
    useState("Date");


  // -----------------------------
  // Filter Questions
  // -----------------------------
  const filteredQuestions =
    questions.filter((q) => {

      const matchesSearch =
        q.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesDifficulty =
        difficulty === "All" ||
        q.difficulty?.toLowerCase() ===
          difficulty.toLowerCase();

      const matchesTopic =
        topic === "All" ||
        q.topic === topic;

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesTopic
      );
    });


  // -----------------------------
  // Sort Questions
  // -----------------------------
  const sortedQuestions =
    [...filteredQuestions].sort(
      (a, b) => {

        if (sort === "Title") {
          return a.title.localeCompare(
            b.title
          );
        }


        if (sort === "Difficulty") {

          const order = {
            easy: 1,
            medium: 2,
            hard: 3,
          };

          return (
            (order[a.difficulty?.toLowerCase()] || 0) -
            (order[b.difficulty?.toLowerCase()] || 0)
          );
        }


        if (sort === "Revisions") {

         const aRevisions =
  a.revisionCount || 0;

const bRevisions =
  b.revisionCount || 0;

          return bRevisions - aRevisions;
        }


        return 0;
      }
    );


  // -----------------------------
  // Loading
  // -----------------------------
  if (questionsLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-400">
          Loading questions...
        </p>
      </div>
    );
  }


  // -----------------------------
  // Error
  // -----------------------------
  if (questionsError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-red-400">
          Failed to load questions:{" "}
          {questionsError}
        </p>
      </div>
    );
  }


  return (
    <div>

      {/* Header */}
      <QuestionsHeader
        setShowAddModal={setShowAddModal}
      />


      {/* Filters */}
      <QuestionFilters
        search={search}
        setSearch={setSearch}

        difficulty={difficulty}
        setDifficulty={setDifficulty}

        topic={topic}
        setTopic={setTopic}

        sort={sort}
        setSort={setSort}
      />


      {/* Questions Table */}
      <QuestionsTable
        questions={sortedQuestions}
        setSelectedQuestion={setSelectedQuestion}
        setEditingQuestion={setEditingQuestion}
        deleteQuestion={deleteQuestion}
        markAsSolved={markAsSolved}
      />


      {/* Add Question */}
      {showAddModal && (
        <QuestionFormModal
          onClose={() =>
            setShowAddModal(false)
          }

          onSave={async (newQuestion) => {
            try {

              await addQuestion(newQuestion);

              setShowAddModal(false);

            } catch (error) {

              console.error(
                "Failed to add question:",
                error
              );

              alert(
                error.message ||
                "Failed to add question."
              );
            }
          }}
        />
      )}


      {/* View Question */}
      {selectedQuestion && (
        <QuestionDetailsModal
  question={selectedQuestion}
  updateRevisionDateForQuestion={
    updateRevisionDateForQuestion
  }
  onClose={() =>
    setSelectedQuestion(null)
  }
/>
      )}


      {/* Edit Question */}
      {editingQuestion && (
        <QuestionFormModal
          question={editingQuestion}

          onClose={() =>
            setEditingQuestion(null)
          }

          onSave={async (updatedQuestion) => {
            try {

              await updateQuestion({
                ...updatedQuestion,
                _id: editingQuestion._id,
              });

              setEditingQuestion(null);

            } catch (error) {

              console.error(
                "Failed to update question:",
                error
              );

              alert(
                error.message ||
                "Failed to update question."
              );
            }
          }}
        />
      )}

    </div>
  );
}

export default Questions;