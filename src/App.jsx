import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import HomePage from "./pages/HomePage";
import KelasPage from "./pages/KelasPage";
import KnowledgePage from "./pages/KnowledgePage";
import FaqPage from "./pages/FaqPage";
import AboutUsPage from "./pages/AboutUs";
import Scan from "./pages/Scan";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UserPage from "./pages/UserPage";
import RiwayatPage from "./pages/RiwayatPage";
import ProfilPage from "./pages/ProfilPage";

import { AuthProvider } from "./context/AuthContext"; // Tambahkan ini
import ProtectedRoute from "./components/ProtectedRoute"; // Tambahkan untuk proteksi rute

function App() {
  return (
    <div>
      <AuthProvider>
        {" "}
        {/* Bungkus dengan AuthProvider */}
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kelas" element={<KelasPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />

          {/* Proteksi rute scan hanya untuk yang sudah login */}
          <Route
            path="/scan"
            element={
              <ProtectedRoute>
                <Scan />
              </ProtectedRoute>
            }
          />
          {/* Rute user page (dashboard pengguna) */}
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          {/* Riwayat */}
          <Route
            path="/riwayat"
            element={
              <ProtectedRoute>
                <RiwayatPage />
              </ProtectedRoute>
            }
          />
          {/* Profile */}
          <Route
            path="/profil"
            element={
              <ProtectedRoute>
                <ProfilPage />
              </ProtectedRoute>
            }
          />

          {/* Rute login dan register */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <FooterComponent />
      </AuthProvider>
    </div>
  );
}

export default App;
