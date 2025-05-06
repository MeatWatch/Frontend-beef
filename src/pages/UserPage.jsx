// src/pages/UserPage.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";

const UserPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Hi, {user?.username} 👋</h2>

      <div className="space-y-4">
        <button
          onClick={() => navigate("/scan")}
          className="block w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Scan Daging
        </button>

        <button
          onClick={() => navigate("/riwayat")}
          className="block w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Riwayat Scan
        </button>

        <button
          onClick={() => navigate("/profil")}
          className="block w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Informasi Pengguna
        </button>

        <button
          onClick={handleLogout}
          className="block w-full px-4 py-2 bg-gray-200 text-red-600 rounded hover:bg-gray-300"
        >
          Logout <IoMdExit className="inline-block ml-1" />
        </button>
      </div>
    </div>
  );
};

export default UserPage;
