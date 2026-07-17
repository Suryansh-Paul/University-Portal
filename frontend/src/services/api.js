import axios from "axios";

export const TOKEN_KEY = "campuscore_token";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT to every outgoing request automatically.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// A single place to listen for "please log the user out" events,
// so AuthContext can react without api.js importing React.
const AUTH_LOGOUT_EVENT = "campuscore:auth-logout";

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes("/login");
    if (error.response?.status === 401 && !isLoginRequest) {
      window.dispatchEvent(new CustomEvent(AUTH_LOGOUT_EVENT, { detail: { reason: "expired" } }));
    }
    return Promise.reject(error);
  }
);

export const onAuthLogout = (handler) => {
  window.addEventListener(AUTH_LOGOUT_EVENT, handler);
  return () => window.removeEventListener(AUTH_LOGOUT_EVENT, handler);
};

/**
 * Converts backend errors into a plain, user-facing string.
 * This backend is inconsistent: some errors come back as a JSON object
 * ({ message }), some as a raw exception string body, and network
 * failures never reach the server at all. Normalize all of it here so
 * components never have to inspect Axios error shapes themselves.
 */
export const getErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  if (!error?.response) {
    return "Unable to connect to the backend. Please ensure the Spring Boot server is running.";
  }

  const { status, data } = error.response;

  if (typeof data === "string" && data.trim().length > 0) {
    return data;
  }
  if (data?.message) {
    return data.message;
  }
  if (status === 403) {
    return "You don't have permission to do that.";
  }
  if (status === 404) {
    return "That item could not be found.";
  }
  if (status === 500) {
    return fallback;
  }
  return fallback;
};

export default api;
