import api from "./api";

// Course has no dedicated create/update DTO on the backend — the
// controller accepts the raw `course` entity. `students` is @JsonIgnore
// on the backend so it never appears in responses; we never send it either.
// Shape: { id, title, department, credits, price, duration, description }

export const getAllCourses = async () => {
  const response = await api.get("/api/courses");
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await api.get(`/api/courses/${id}`);
  return response.data;
};

export const createCourse = async (payload) => {
  const response = await api.post("/api/courses", payload);
  return response.data;
};

// PUT returns a plain confirmation string — callers re-fetch after success.
export const updateCourse = async (id, payload) => {
  const response = await api.put(`/api/courses/${id}`, payload);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/api/courses/${id}`);
  return response.data;
};
