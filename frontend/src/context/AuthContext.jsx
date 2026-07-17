import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { TOKEN_KEY, onAuthLogout } from "../services/api";
import { login as loginRequest, getCurrentUser, isTokenExpired } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  // "checking" avoids ever flashing protected content before we know
  // whether the stored token is valid and what role it belongs to.
  const [status, setStatus] = useState("checking");

  const clearSession = useCallback((message) => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUsername(null);
    setRole(null);
    setStatus("unauthenticated");
    if (message) {
      // Stashed for the Login page to show as a toast after redirect.
      sessionStorage.setItem("campuscore_session_message", message);
    }
  }, []);

  const establishSession = useCallback(async (newToken) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    try {
      const currentUser = await getCurrentUser();
      setUsername(currentUser.username);
      setRole(currentUser.role);
      setStatus("authenticated");
    } catch {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    const existingToken = localStorage.getItem(TOKEN_KEY);
    if (!existingToken || isTokenExpired(existingToken)) {
      clearSession();
      return;
    }
    establishSession(existingToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return onAuthLogout(() => {
      clearSession("Session expired. Please login again.");
    });
  }, [clearSession]);

  const login = useCallback(
    async (usernameInput, password) => {
      const newToken = await loginRequest(usernameInput, password);
      await establishSession(newToken);
    },
    [establishSession]
  );

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      token,
      username,
      role,
      isAdmin: role === "ADMIN",
      isAuthenticated: status === "authenticated",
      isChecking: status === "checking",
      login,
      logout,
    }),
    [token, username, role, status, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
