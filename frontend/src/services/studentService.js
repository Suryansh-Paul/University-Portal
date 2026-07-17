import api from "./api";

// GET /api/students returns a list of `student` entities. Each one is
// nested: { id, name, email, rollNumber, age, courses: {...}, user: {...} }
// Note the backend field is literally named "courses" (singular concept,
// plural name) on the student entity — we keep that name at the service
// boundary and only rename for display in components if needed.

export const getAllStudents = async () => {
  const response = await api.get("/api/students");
  return response.data;
};

export const getStudentById = async (id) => {
  const response = await api.get(`/api/students/${id}`);
  return response.data;
};

export const searchStudents = async (keyword) => {
  const response = await api.get("/api/students/search", {
    params: { keyword },
  });
  return response.data;
};

// Create/Update both use CreateStudentRequest:
// { username, password, name, email, rollNumber, age, courseId }
export const createStudent = async (payload) => {
  const response = await api.post("/api/students", payload);
  return response.data;
};

// PUT returns a plain confirmation string, not the updated entity —
// callers must re-fetch after a successful update.
export const updateStudent = async (id, payload) => {
  const response = await api.put(`/api/students/${id}`, payload);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await api.delete(`/api/students/${id}`);
  return response.data;
};
