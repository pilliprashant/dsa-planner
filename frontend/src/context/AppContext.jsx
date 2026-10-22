import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  getQuestions,
  createQuestion,
  updateQuestion as updateQuestionAPI,
  deleteQuestion as deleteQuestionAPI,
  markQuestionSolved,
  completeRevision as completeRevisionAPI,
  updateRevisionDate,
  getCurrentUser,
  updateProfile as updateProfileAPI,
  updatePreferences as updatePreferencesAPI,
} from "../api/api";
import initialUser from "../data/user";

const AppContext = createContext();


// -----------------------------
// Local Storage Helper
// -----------------------------
const getStoredData = (key, fallback) => {
  try {
    const storedData = localStorage.getItem(key);

    return storedData
      ? JSON.parse(storedData)
      : fallback;
  } catch (error) {
    console.error(
      `Error reading ${key} from localStorage:`,
      error
    );

    return fallback;
  }
};


export function AppProvider({ children }) {

  // -----------------------------
  // Questions
  // -----------------------------
  const [questions, setQuestions] = useState([]);

  const [questionsLoading, setQuestionsLoading] =
    useState(true);

  const [questionsError, setQuestionsError] =
    useState(null);


  // -----------------------------
  // User
  // -----------------------------
  const [user, setUser] = useState(() =>
  getStoredData(
    "smartdsa_user",
    null
  )
);


  // -----------------------------
  // Authentication
  // -----------------------------
 const [isAuthenticated, setIsAuthenticated] = useState(
  () => !!localStorage.getItem("token")
);
// -----------------------------
// Fetch Current User
// -----------------------------
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  const fetchCurrentUser = async () => {
    try {
      const data = await getCurrentUser();

      setUser(data.user);

    } catch (error) {
      console.error(
        "Failed to fetch current user:",
        error
      );

      // Token is invalid/expired
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  };

  fetchCurrentUser();

}, []);

  // -----------------------------
  // Preferences
  // -----------------------------
  const [preferences, setPreferences] =
    useState(() =>
      getStoredData(
        "smartdsa_preferences",
        {
          notifications: true,
          revisionReminders: true,
          appearance: "dark",
        }
      )
    );


  // -----------------------------
  // Fetch Questions
  // -----------------------------
  useEffect(() => {

    const fetchQuestions = async () => {

      try {

        setQuestionsLoading(true);
        setQuestionsError(null);

        const data = await getQuestions();

        setQuestions(data.questions);

      } catch (error) {

        console.error(
          "Failed to fetch questions:",
          error
        );

        setQuestionsError(error.message);

      } finally {

        setQuestionsLoading(false);

      }
    };


    fetchQuestions();

  }, [user?.id]);


  // -----------------------------
  // Add Question
  // -----------------------------
  const addQuestion = async (newQuestion) => {

    try {

      const data =
        await createQuestion(newQuestion);

      const question = data.question;

      setQuestions((prev) => [
        ...prev,
        question,
      ]);

      return question;

    } catch (error) {

      console.error(
        "Failed to create question:",
        error
      );

      throw error;

    }
  };


 // -----------------------------
// Mark Question as Solved
// -----------------------------
const markAsSolved = async (id) => {
  try {
    const data = await markQuestionSolved(id);

    const progress = data.progress;

    setQuestions((prev) =>
      prev.map((q) =>
        q._id === id
          ? {
              ...q,

              // Put progress directly on the question
              solved: progress.solved,
              solvedAt: progress.solvedAt,
              revisionStage: progress.revisionStage,
              revisionCount: progress.revisionCount,
              nextScheduled: progress.nextScheduled,
              revisionCompleted:
                progress.revisionCompleted,
              revisionLogs:
                progress.revisionLogs || [],
            }
          : q
      )
    );

    return progress;
  } catch (error) {
    console.error(
      "Failed to mark question as solved:",
      error
    );

    throw error;
  }
};


 // -----------------------------
// Update Question
// -----------------------------
const updateQuestion = async (updatedQuestion) => {
  try {
    const data = await updateQuestionAPI(
      updatedQuestion._id,
      updatedQuestion
    );

    setQuestions((prev) =>
      prev.map((q) =>
        q._id === data.question._id
          ? {
              ...q,

              // Keep existing question fields
              ...data.question,

              // Keep user progress fields
              solved:
                updatedQuestion.solved ??
                q.solved ??
                false,

              solvedAt:
                updatedQuestion.solvedAt ??
                q.solvedAt ??
                null,

              revisionStage:
                updatedQuestion.revisionStage ??
                q.revisionStage ??
                0,

              revisionCount:
                updatedQuestion.revisionCount ??
                q.revisionCount ??
                0,

              nextScheduled:
                updatedQuestion.nextScheduled ??
                q.nextScheduled ??
                null,

              revisionCompleted:
                updatedQuestion.revisionCompleted ??
                q.revisionCompleted ??
                false,

              revisionLogs:
                updatedQuestion.revisionLogs ??
                q.revisionLogs ??
                [],
            }
          : q
      )
    );

    return data.question;
  } catch (error) {
    console.error(
      "Failed to update question:",
      error
    );

    throw error;
  }
};
const updateRevisionDateForQuestion = async (
  id,
  date
) => {
  try {
    const data = await updateRevisionDate(
      id,
      date
    );

    setQuestions((prev) =>
      prev.map((q) =>
        q._id === id
          ? {
              ...q,
              nextScheduled:
                data.progress.nextScheduled,
              solved:
                data.progress.solved,
              solvedAt:
                data.progress.solvedAt,
              revisionStage:
                data.progress.revisionStage,
              revisionCount:
                data.progress.revisionCount,
              revisionCompleted:
                data.progress.revisionCompleted,
              revisionLogs:
                data.progress.revisionLogs || [],
            }
          : q
      )
    );

    return data.progress;
  } catch (error) {
    console.error(
      "Failed to update revision date:",
      error
    );

    throw error;
  }
};

  // -----------------------------
  // Delete Question
  // -----------------------------
  const deleteQuestion = async (id) => {

    try {

      await deleteQuestionAPI(id);

      setQuestions((prev) =>
        prev.filter(
          (q) => q._id !== id
        )
      );

    } catch (error) {

      console.error(
        "Failed to delete question:",
        error
      );

      throw error;

    }
  };


  // -----------------------------
  // Update User
  // -----------------------------
  const updateUser = async (updatedUser) => {
  try {
    const data = await updateProfileAPI(updatedUser);

    setUser(data.user);

    return data.user;
  } catch (error) {
    console.error(
      "Failed to update profile:",
      error
    );

    throw error;
  }
};


  // -----------------------------
  // Login
  // -----------------------------
  const login = (loggedInUser) => {
  setIsAuthenticated(true);

  if (loggedInUser) {
    setUser(loggedInUser);
  }
};


  // -----------------------------
  // Logout
  // -----------------------------
 const logout = () => {
  localStorage.removeItem("token");
  setIsAuthenticated(false);
  setUser(null);
  setQuestions([]);
};


  // -----------------------------
  // Update Preferences
  // -----------------------------
  const updatePreferences = async (updatedPreferences) => {
  try {
    const data = await updatePreferencesAPI(
      updatedPreferences
    );

    setPreferences(data.preferences);

    return data.preferences;

  } catch (error) {
    console.error(
      "Failed to update preferences:",
      error
    );

    throw error;
  }
};
const completeRevision = async (id, notes) => {
  try {
    const data = await completeRevisionAPI(id, notes);

    setQuestions((prev) =>
      prev.map((q) =>
        q._id === id
          ? {
              ...q,
              solved: data.progress.solved,
              solvedAt: data.progress.solvedAt,
              revisionStage: data.progress.revisionStage,
              revisionCount: data.progress.revisionCount,
              nextScheduled: data.progress.nextScheduled,
              revisionCompleted:
                data.progress.revisionCompleted,
              revisionLogs: data.progress.revisionLogs,
            }
          : q
      )
    );

    return data.progress;
  } catch (error) {
    console.error(
      "Failed to complete revision:",
      error
    );

    throw error;
  }
};

  // -----------------------------
  // Persist User
  // -----------------------------
  useEffect(() => {

    localStorage.setItem(
      "smartdsa_user",
      JSON.stringify(user)
    );

  }, [user]);


  // -----------------------------
  // Persist Authentication
  // -----------------------------
  useEffect(() => {

    localStorage.setItem(
      "smartdsa_authenticated",
      JSON.stringify(
        isAuthenticated
      )
    );

  }, [isAuthenticated]);


  // -----------------------------
  // Persist Preferences
  // -----------------------------
  useEffect(() => {

    localStorage.setItem(
      "smartdsa_preferences",
      JSON.stringify(
        preferences
      )
    );

  }, [preferences]);


  // -----------------------------
  // Provider
  // -----------------------------
  return (

    <AppContext.Provider
      value={{

        // Questions
        questions,
        setQuestions,

        questionsLoading,
        questionsError,

        addQuestion,
        markAsSolved,
        completeRevision,
        updateQuestion,
        updateRevisionDateForQuestion,
        deleteQuestion,


        // User
        user,
        setUser,
        updateUser,


        // Authentication
        isAuthenticated,
        login,
        logout,


        // Preferences
        preferences,
        updatePreferences,

      }}
    >

      {children}

    </AppContext.Provider>

  );

}


export function useApp() {

  return useContext(AppContext);

}