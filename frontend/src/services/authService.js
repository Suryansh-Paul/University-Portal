import api from "./api";

/**
 * POST /login
 * Backend expects a raw User shape ({ username, password }) and returns
 * only { token }. It does NOT return the username or role.
 */
export const login = async (username, password) => {
  const response = await api.post("/login", { username, password });
  return response.data.token;
};

/**
 * GET /api/me returns { username, role } for the currently authenticated
 * user, resolved server-side from the JWT. This is the source of truth
 * for role-aware UI — the JWT itself carries no role claim.
 */
export const getCurrentUser = async () => {
  const response = await api.get("/api/me");
  return response.data; // { username, role }
};

/**
 * Decode the JWT payload purely to read the username (sub claim) and
 * expiry for client-side session bookkeeping. This is not a security
 * boundary — the backend independently validates the token on every call.
 */
export const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return decoded.exp * 1000 < Date.now();
};
