import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // ✅ Cek apakah token expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (err) {
      return true;
    }
  };

  // ✅ Setup awal saat aplikasi dimuat
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token) {
        if (isTokenExpired(token)) {
          console.log("⏰ Token expired, logging out");
          logout();
        } else {
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          } else {
            try {
              const decoded = jwtDecode(token);
              const userFromToken = {
                _id: decoded.id,
                name: decoded.name,
                email: decoded.email,
              };
              setUser(userFromToken);
              localStorage.setItem("user", JSON.stringify(userFromToken));
            } catch (err) {
              console.error("❌ Invalid token", err);
              logout();
            }
          }
        }
      }

      setInitialized(true);
    };

    initializeAuth();
  }, []);

  // ✅ Login
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { identifier, password } = credentials;
      const response = await api.post("/users/login", { identifier, password });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const { confirmPassword, ...registrationData } = userData;
      const response = await api.post("/users/register", registrationData);

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // ✅ Update profile
  const updateUser = async (updatedData) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      if (updatedData.username)
        formData.append("username", updatedData.username);
      if (updatedData.email) formData.append("email", updatedData.email);
      if (updatedData.no_telp) formData.append("no_telp", updatedData.no_telp);
      if (updatedData.address) formData.append("address", updatedData.address);

      // Ganti dari 'avatar' ke 'profile_picture' (SINKRON DENGAN BACKEND)
      if (updatedData.avatar instanceof File) {
        console.log("📸 Mengirim file:", updatedData.avatar.name);
        formData.append("profile_picture", updatedData.avatar);
      } else {
        console.log("⚠️ Tidak ada file avatar yang valid");
      }

      // Log form data
      for (let [key, value] of formData.entries()) {
        console.log("📝 FormData:", key, value);
      }

      const response = await api.patch(`/users/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUser = { ...user, ...response.data.user };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return { success: true, user: updatedUser };
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.response?.data?.error || err.message;

      if (errorMsg.toLowerCase().includes("token expired")) {
        logout();
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Helper function untuk konversi data URL ke Blob
  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const getUserById = async (id) => {
    try {
      const response = await api.get(`/users/profile/${id}`);
      return response.data;
    } catch (err) {
      console.error("❌ Failed to get user:", err);
      throw err;
    }
  };
  // ✅ Update user context (manual override)
  const updateUserContext = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Auto clear error after 5s
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
        initialized,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        updateUser,
        getUserById,
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
