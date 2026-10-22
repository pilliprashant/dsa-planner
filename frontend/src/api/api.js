const API_URL = "https://dsa-planner-api.onrender.com";

// ===============================
// TOKEN
// ===============================

function getToken() {
  return localStorage.getItem("token");
}


// ===============================
// COMMON REQUEST
// ===============================

async function apiRequest(endpoint, options = {}) {
  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong"
    );
  }

  return data;
}


// ===============================
// AUTHENTICATION
// ===============================

export function loginUser(email, password) {
  return apiRequest("/auth/login", {
    method: "POST",

    body: JSON.stringify({
      email,
      password,
    }),
  });
}


export function registerUser(userData) {
  return apiRequest("/auth/register", {
    method: "POST",

    body: JSON.stringify(userData),
  });
}


export function getCurrentUser() {
  return apiRequest("/users/profile");
}
export function updateProfile(userData) {
  return apiRequest("/users/profile", {
    method: "PUT",
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
    }),
  });
}
export function changePassword(currentPassword, newPassword) {
  return apiRequest("/users/password", {
    method: "PUT",
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });
}
export function updatePreferences(preferences) {
  return apiRequest("/users/preferences", {
    method: "PUT",
    body: JSON.stringify({
      notifications: preferences.notifications,
      revisionReminders: preferences.revisionReminders,
    }),
  });
}
// ===============================
// QUESTIONS
// ===============================

export function getQuestions() {
  return apiRequest("/questions");
}


export function getQuestion(id) {
  return apiRequest(`/questions/${id}`);
}


export function createQuestion(question) {
  return apiRequest("/questions", {
    method: "POST",
    body: JSON.stringify(question),
  });
}


export function updateQuestion(id, question) {
  return apiRequest(`/questions/${id}`, {
    method: "PUT",
    body: JSON.stringify(question),
  });
}


export function deleteQuestion(id) {
  return apiRequest(`/questions/${id}`, {
    method: "DELETE",
  });
}


export function markQuestionSolved(id) {
  return apiRequest(`/questions/${id}/solve`, {
    method: "PATCH",
  });
}
// ===============================
// REVISION
// ===============================

export function completeRevision(id, notes) {
  return apiRequest(`/questions/${id}/revision`, {
    method: "PATCH",

    body: JSON.stringify({
      notes,
    }),
  });
}
export function updateRevisionDate(id, date) {
  return apiRequest(`/questions/${id}/revision/date`, {
    method: "PATCH",
    body: JSON.stringify({
      nextScheduled: date,
    }),
  });
}

export function delayRevision(id, days) {
  return apiRequest(`/questions/${id}/revision/delay`, {
    method: "PATCH",

    body: JSON.stringify({
      days,
    }),
  });
}