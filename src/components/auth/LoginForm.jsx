import { useState, useEffect } from "react";
import { FaUser, FaLock, FaSpinner, FaCheck } from "react-icons/fa";
import Input from "../common/Input";
import Button from "../common/Button";

const LoginForm = ({ onSubmit, loading, error }) => {
  // Load saved data from localStorage or initialize
  const [credentials, setCredentials] = useState(() => {
    const savedData = localStorage.getItem("loginFormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          username: "",
          password: "",
          rememberMe: false,
        };
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Persist form data to localStorage when it changes
  useEffect(() => {
    if (credentials.rememberMe) {
      localStorage.setItem("loginFormData", JSON.stringify(credentials));
    }
  }, [credentials]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setCredentials((prev) => ({
      ...prev,
      [name]: val,
    }));

    if (touched[name]) {
      validateField(name, val);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, credentials[name]);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value.trim()) error = "Username is required";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6)
          error = "Password must be at least 6 characters";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const clearFormData = () => {
    if (!credentials.rememberMe) {
      localStorage.removeItem("loginFormData");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      username: true,
      password: true,
    });

    const isUsernameValid = validateField("username", credentials.username);
    const isPasswordValid = validateField("password", credentials.password);

    if (isUsernameValid && isPasswordValid) {
      onSubmit(credentials);
      clearFormData();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form" autoComplete="on">
      {/* Error Message */}
      {error && <div className="form-error-message">{error}</div>}

      {/* Username Field */}
      <div className={`form-group ${errors.username ? "has-error" : ""}`}>
        <label htmlFor="username" className="form-label">
          Username *
        </label>
        <div className="input-with-icon">
          <FaUser className="input-icon" />
          <Input
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your username"
            className="form-input"
            error={errors.username}
            autoComplete="username"
          />
          {touched.username && !errors.username && credentials.username && (
            <FaCheck className="success-icon" />
          )}
        </div>
        {errors.username && (
          <span className="field-error">{errors.username}</span>
        )}
      </div>

      {/* Password Field */}
      <div className={`form-group ${errors.password ? "has-error" : ""}`}>
        <label htmlFor="password" className="form-label">
          Password *
        </label>
        <div className="input-with-icon">
          <FaLock className="input-icon" />
          <Input
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your password"
            className="form-input"
            error={errors.password}
            autoComplete="current-password"
          />
          {touched.password && !errors.password && credentials.password && (
            <FaCheck className="success-icon" />
          )}
        </div>
        {errors.password && (
          <span className="field-error">{errors.password}</span>
        )}
      </div>

      {/* Remember Me Checkbox */}
      <div className="form-group remember-me">
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={credentials.rememberMe}
            onChange={handleChange}
          />
          Remember me
        </label>
      </div>

      {/* Login Button */}
      <Button type="submit" disabled={loading} className="login-button">
        {loading ? (
          <>
            <FaSpinner className="spinner" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>

      {/* Forgot Password Link */}
      <div className="form-footer">
        <a href="#" className="forgot-password-link">
          Forgot password?
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
