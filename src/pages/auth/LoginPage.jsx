import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginForm from "../../components/auth/LoginForm";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      navigate("/");
    } catch (err) {
      // Error handling is done in AuthContext
    }
  };

  return (
    <div className="login-page-container">
      {/* Main login form */}
      <main className="login-main-content">
        <div className="login-form-container">
          <div className="login-image-wrapper center-align">
            <img
              src="/MeatWatch1(1).png"
              alt="Login Illustration"
              className="login-image small "
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <LoginForm onSubmit={handleLogin} loading={loading} />

          <div className="register-prompt">
            Don't have an account?{" "}
            <a href="/register" className="register-link">
              Register here
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
