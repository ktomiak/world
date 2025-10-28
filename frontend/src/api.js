//const API_URL = "/api";
const API_URL = "http://localhost:5000/api";

//AUTH

export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

//ME

export const getMe = async (token) => {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const updateMe = async (token, data) => {
  const res = await fetch(`${API_URL}/users/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

//POST

export const getPosts = async () => {
  const res = await fetch(`${API_URL}/posts`);
  return res.json();
};

export const createPost = async (token, data) => {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updatePost = async (token, postId, data) => {
  const res = await fetch(`${API_URL}/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deletePost = async (token, postId) => {
  const res = await fetch(`${API_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

//USERS

export const getAllUsers = async (token) => {
  const res = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getAllAdminUsers = async (token) => {
  const res = await fetch(`${API_URL}/users/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const updateUserRole = async (token, userId, role) => {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });
  return res.json();
};

export const getRoles = async (token) => {
  const res = await fetch(`${API_URL}/users/roles`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

//TASKS 

// Pobierz wszystkie taski (globalne) — tylko dla ADMIN
export async function getTasks(token) {
  const res = await fetch("/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Błąd pobierania zadań");
  return res.json();
}

// Pobierz taski moje prywatne użytkownika
export async function getMyTasks(token) {
  const res = await fetch("/api/tasks/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Błąd pobierania moich zadań");
  return res.json();
}

// Utwórz nowe zadanie
export async function createTask(token, data) {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Błąd tworzenia zadania");
  return res.json();
}

// Zaktualizuj istniejące zadanie
export async function updateTask(token, id, data) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Błąd aktualizacji zadania");
  return res.json();
}