import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaCheck, FaSpinner } from "react-icons/fa";

const RegisterForm = ({ onSubmit, loading }) => {
  // Initialize state with localStorage data or defaults
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("registerFormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        };
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Persist form data to localStorage
  useEffect(() => {
    localStorage.setItem("registerFormData", JSON.stringify(userData));
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleFocus = (e) => {
    e.target.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value) error = "Username is required";
        else if (value.length < 3)
          error = "Username must be at least 3 characters";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6)
          error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (!value) error = "Please confirm your password";
        else if (value !== userData.password) error = "Passwords don't match";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateForm = () => {
    return Object.keys(userData).every((key) =>
      validateField(key, userData[key])
    );
  };

  const clearFormData = () => {
    localStorage.removeItem("registerFormData");
    setUserData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setTouched({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTouched = Object.keys(userData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(newTouched);

    if (validateForm()) {
      onSubmit(userData);
      clearFormData();
    }
  };

  const getInputClass = (name) => {
    return `form-input ${errors[name] ? "error" : ""} ${
      touched[name] && !errors[name] && userData[name] ? "success" : ""
    }`;
  };

  return (
    <form onSubmit={handleSubmit} className="register-form" autoComplete="on">
      {/* Username Field */}
      <div className={`form-group ${errors.username ? "has-error" : ""}`}>
        <label htmlFor="username">Username *</label>
        <div className="input-container">
          <div className="icon-wrapper">
            <FaUser className="input-icon" />
          </div>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            value={userData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={getInputClass("username")}
            required
          />
          {touched.username && !errors.username && userData.username && (
            <div className="icon-wrapper">
              <FaCheck className="success-icon" />
            </div>
          )}
        </div>
        {errors.username && (
          <span className="error-message">{errors.username}</span>
        )}
      </div>

      {/* Email Field */}
      <div className={`form-group ${errors.email ? "has-error" : ""}`}>
        <label htmlFor="email">Email *</label>
        <div className="input-container">
          <div className="icon-wrapper">
            <FaEnvelope className="input-icon" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={userData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={getInputClass("email")}
            required
          />
          {touched.email && !errors.email && userData.email && (
            <div className="icon-wrapper">
              <FaCheck className="success-icon" />
            </div>
          )}
        </div>
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      {/* Password Field */}
      <div className={`form-group ${errors.password ? "has-error" : ""}`}>
        <label htmlFor="password">Password *</label>
        <div className="input-container">
          <div className="icon-wrapper">
            <FaLock className="input-icon" />
          </div>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            value={userData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={getInputClass("password")}
            required
          />
          {touched.password && !errors.password && userData.password && (
            <div className="icon-wrapper">
              <FaCheck className="success-icon" />
            </div>
          )}
        </div>
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      {/* Confirm Password Field */}
      <div
        className={`form-group ${errors.confirmPassword ? "has-error" : ""}`}
      >
        <label htmlFor="confirmPassword">Confirm Password *</label>
        <div className="input-container">
          <div className="icon-wrapper">
            <FaLock className="input-icon" />
          </div>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            value={userData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={getInputClass("confirmPassword")}
            required
          />
          {touched.confirmPassword &&
            !errors.confirmPassword &&
            userData.confirmPassword && (
              <div className="icon-wrapper">
                <FaCheck className="success-icon" />
              </div>
            )}
        </div>
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`register-btn ${loading ? "loading" : ""}`}
        disabled={loading}
      >
        {loading ? (
          <>
            <FaSpinner className="spinner" />
            Registering...
          </>
        ) : (
          "Register"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
