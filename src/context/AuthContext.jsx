// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [initialized, setInitialized] = useState(false);

//   // Initialize auth state from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("currentUser");
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (err) {
//         console.error("Failed to parse user data", err);
//         localStorage.removeItem("currentUser");
//       }
//     }
//     setInitialized(true);
//   }, []);

//   const updateUser = async (updatedData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Simulate API call delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Get all users from localStorage
//       const users = JSON.parse(localStorage.getItem("users")) || [];

//       // Find current user index
//       const userIndex = users.findIndex((u) => u.id === user.id);

//       if (userIndex === -1) {
//         throw new Error("User not found");
//       }

//       // Update user data
//       const updatedUser = {
//         ...users[userIndex],
//         ...updatedData,
//         updatedAt: new Date().toISOString(),
//       };

//       // Update users array
//       users[userIndex] = updatedUser;
//       localStorage.setItem("users", JSON.stringify(users));

//       // Update current user in state and localStorage (without password)
//       const { password, ...safeUser } = updatedUser;
//       setUser(safeUser);
//       localStorage.setItem("currentUser", JSON.stringify(safeUser));

//       return { success: true, user: safeUser };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (credentials) => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Simulate API call delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const users = JSON.parse(localStorage.getItem("users")) || [];
//       const foundUser = users.find(
//         (u) =>
//           u.username === credentials.username &&
//           u.password === credentials.password
//       );

//       if (!foundUser) {
//         throw new Error("Invalid username or password");
//       }

//       // Don't store password in user state
//       const { password, ...safeUser } = foundUser;
//       setUser(safeUser);
//       localStorage.setItem("currentUser", JSON.stringify(safeUser));

//       return safeUser;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const register = async (userData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Validation
//       if (userData.password !== userData.confirmPassword) {
//         throw new Error("Passwords don't match");
//       }

//       if (userData.password.length < 6) {
//         throw new Error("Password must be at least 6 characters");
//       }

//       // Simulate API call delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const users = JSON.parse(localStorage.getItem("users")) || [];

//       // Check for existing user
//       if (users.some((u) => u.username === userData.username)) {
//         throw new Error("Username already exists");
//       }

//       if (users.some((u) => u.email === userData.email)) {
//         throw new Error("Email already registered");
//       }

//       // Create new user with additional fields
//       const newUser = {
//         id: Date.now().toString(),
//         username: userData.username,
//         email: userData.email,
//         phone: userData.phone || "",
//         address: userData.address || "",
//         password: userData.password, // Note: In real app, hash this password
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };

//       // Update storage
//       users.push(newUser);
//       localStorage.setItem("users", JSON.stringify(users));

//       // Auto-login after registration
//       const { password, ...safeUser } = newUser;
//       setUser(safeUser);
//       localStorage.setItem("currentUser", JSON.stringify(safeUser));

//       return safeUser;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("currentUser");
//   };

//   // Clear error after some time
//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => setError(null), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         error,
//         initialized,
//         isAuthenticated: !!user,
//         login,
//         logout,
//         register,
//         updateUser, // Now included in the context
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios"; // Adjust the import path

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize auth state from token and user data
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token) {
        // Ambil user dari localStorage lebih dulu untuk pengalaman cepat
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }

        try {
          setLoading(true);
          // Cek ulang ke backend untuk validasi token & update user
          const response = await api.get("/auth/me");
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } catch (err) {
          console.error("Failed to verify token", err);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        } finally {
          setLoading(false);
          setInitialized(true);
        }
      } else {
        setInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const updateUser = async (updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch(`/users/${user._id}`, updatedData); // ✅
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return { success: true, user: response.data.user };
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    console.log("🔍 Credentials before sending:", credentials);
    setLoading(true);
    setError(null);
    try {
      const { identifier, password } = credentials;
      const response = await api.post("/users/login", {
        identifier,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Simpan user
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const { confirmPassword, ...registrationData } = userData;
      const response = await api.post("/users/register", registrationData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Simpan user
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ Hapus user juga
  };

  // Clear error after some time
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

// =============================== //
// saat menggunakan fetch //
// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [initialized, setInitialized] = useState(false);

//   // ==============================================
//   // KONFIGURASI API (Sesuaikan dengan kebutuhan)
//   // ==============================================
//   const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"; // Untuk JSON Server
//   // const API_BASE_URL = "https://api-anda.com"; // Untuk backend deployed

//   // Axios instance untuk API
//   const api = axios.create({
//     baseURL: API_BASE_URL,
//     timeout: 5000,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   // Interceptor untuk attach token (jika sudah login)
//   api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });

//   // ==============================================
//   // INISIALISASI AWAL (Cek token saat mount)
//   // ==============================================
//   useEffect(() => {
//     const initAuth = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           // Untuk backend deployed:
//           const response = await api.get("/auth/me"); // Endpoint profil user
//           setUser(response.data.user);

//           // Untuk JSON Server (mock response):
//           // const response = await api.get(`/users?token=${token}`);
//           // setUser(response.data[0]);
//         } catch (err) {
//           console.error("Auth check failed:", err);
//           logout();
//         }
//       }
//       setInitialized(true);
//     };
//     initAuth();
//   }, []);

//   // ==============================================
//   // FUNGSI LOGIN (POST ke API)
//   // ==============================================
//   const login = async (credentials) => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Untuk backend deployed:
//       const response = await api.post("/auth/login", credentials);
//       const { user, token } = response.data;

//       // Untuk JSON Server (mock response):
//       // const response = await api.get(`/users?username=${credentials.username}`);
//       // const user = response.data[0];
//       // if (!user || user.password !== credentials.password) {
//       //   throw new Error("Invalid credentials");
//       // }
//       // const token = "mock-token-" + user.id;

//       // Simpan token dan user
//       localStorage.setItem("token", token);
//       setUser(user);
//       return user;
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==============================================
//   // FUNGSI REGISTER (POST ke API)
//   // ==============================================
//   const register = async (userData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Validasi lokal (opsional)
//       if (userData.password !== userData.confirmPassword) {
//         throw new Error("Passwords don't match");
//       }

//       // Untuk backend deployed:
//       const response = await api.post("/auth/register", userData);
//       const { user, token } = response.data;

//       // Untuk JSON Server (mock response):
//       // const newUser = { ...userData, id: Date.now().toString() };
//       // await api.post("/users", newUser);
//       // const token = "mock-token-" + newUser.id;
//       // const user = { ...newUser, password: undefined };

//       // Auto-login setelah registrasi
//       localStorage.setItem("token", token);
//       setUser(user);
//       return user;
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==============================================
//   // FUNGSI UPDATE USER (PUT ke API)
//   // ==============================================
//   const updateUser = async (updatedData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Untuk backend deployed:
//       const response = await api.put(`/users/${user.id}`, updatedData);
//       const updatedUser = response.data;

//       // Untuk JSON Server (mock response):
//       // const response = await api.patch(`/users/${user.id}`, updatedData);
//       // const updatedUser = response.data;

//       setUser(updatedUser);
//       return updatedUser;
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==============================================
//   // FUNGSI LOGOUT
//   // ==============================================
//   const logout = () => {
//     // Untuk backend deployed (opsional):
//     // api.post("/auth/logout"); // Jika backend perlu tahu

//     // Hapus token dan reset state
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   // ==============================================
//   // BAGIAN YANG TIDAK DIPAKAI LAGI (LocalStorage)
//   // ==============================================
//   /*
//   // Kode berikut tidak dipakai lagi setelah migrasi ke API:
//   // - Semua operasi localStorage (getItem, setItem, removeItem)
//   // - Simulasi delay dengan setTimeout
//   // - Pengecekan user di array localStorage
//   // - Penyimpanan password plaintext
//   */

//   // Clear error setelah 5 detik
//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => setError(null), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         error,
//         initialized,
//         isAuthenticated: !!user,
//         login,
//         logout,
//         register,
//         updateUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
