import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user data", err);
        localStorage.removeItem("currentUser");
      }
    }
    setInitialized(true);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find(
        (u) =>
          u.username === credentials.username &&
          u.password === credentials.password
      );

      if (!foundUser) {
        throw new Error("Invalid username or password");
      }

      // Don't store password in user state
      const { password, ...safeUser } = foundUser;
      setUser(safeUser);
      localStorage.setItem("currentUser", JSON.stringify(safeUser));

      return safeUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      // Validation
      if (userData.password !== userData.confirmPassword) {
        throw new Error("Passwords don't match");
      }

      if (userData.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Check for existing user
      if (users.some((u) => u.username === userData.username)) {
        throw new Error("Username already exists");
      }

      if (users.some((u) => u.email === userData.email)) {
        throw new Error("Email already registered");
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        password: userData.password, // Note: In real app, hash this password
        createdAt: new Date().toISOString(),
      };

      // Update storage
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Auto-login after registration
      const { password, ...safeUser } = newUser;
      setUser(safeUser);
      localStorage.setItem("currentUser", JSON.stringify(safeUser));

      return safeUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  // Optional: Clear error after some time
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        initialized, // Useful for checking if auth state is loaded
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
