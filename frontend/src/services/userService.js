import api from "./api";

// User entity: { id, username, password (write-only, never returned),
// role }. Admin-only on the backend (@PreAuthorize at the class level).

export const getAllUsers = async () => {
  const response = await api.get("/api/users");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/api/users/${id}`);
  return response.data;
};

export const createUser = async (payload) => {
  const response = await api.post("/api/users", payload);
  return response.data;
};

// PUT returns a plain confirmation string — callers re-fetch after success.
export const updateUser = async (id, payload) => {
  const response = await api.put(`/api/users/${id}`, payload);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/api/users/${id}`);
  return response.data;
};
