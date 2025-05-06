// src/components/ProtectedRoute.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading, initialized } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Spinner sederhana dengan inline style
  const LoadingSpinner = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          animation: "spin 1s linear infinite",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          border: "3px solid rgba(0,0,0,0.1)",
          borderTopColor: "#3498db",
        }}
      ></div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  useEffect(() => {
    if (initialized && !loading && !user) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });
    }
  }, [user, loading, initialized, navigate, location]);

  if (!initialized || loading) {
    return <LoadingSpinner />;
  }

  if (
    !user ||
    (roles.length > 0 && !roles.some((r) => user.roles?.includes(r)))
  ) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
