import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RegisterForm from "../../components/auth/RegisterForm";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      navigate("/login");
    } catch (err) {
      // Error handling
    }
  };

  return (
    <div className="register-page">
      {" "}
      {/* Tambahkan class ini */}
      <div className="register-container">
        <div className="register-card">
          <div className="text-center mb-4">
            <img
              src="/MeatWatch1(1).png"
              alt="Logo"
              width="60"
              className="mb-3"
            />
            <h2>WatchMeat</h2>
          </div>

          <h4 className="text-center mb-4">Create your account</h4>

          {error && <div className="alert alert-danger">{error}</div>}

          <RegisterForm onSubmit={handleRegister} loading={loading} />

          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-danger">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
