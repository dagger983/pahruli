import React, { useState } from "react";
import "./Login.css"; // Reusing the same CSS file as Login
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", mobile: "", password: "" });

  const navigate = useNavigate(); // Use useNavigate to programmatically navigate

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateUsername = () => {
    if (username.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        username: "Username is required",
      }));
    } else if (username.length < 3) {
      setErrors((prevState) => ({
        ...prevState,
        username: "Username must be at least 3 characters",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        username: "",
      }));
    }
  };

  const validateMobile = () => {
    if (mobile.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        mobile: "Mobile number is required",
      }));
    } else if (!/^\d{10}$/.test(mobile)) {
      setErrors((prevState) => ({
        ...prevState,
        mobile: "Mobile number must be 10 digits",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        mobile: "",
      }));
    }
  };

  const validatePassword = () => {
    if (password.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        password: "Password is required",
      }));
    } else if (password.length < 6) {
      setErrors((prevState) => ({
        ...prevState,
        password: "Password must be at least 6 characters",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        password: "",
      }));
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Validate fields
    validateUsername();
    validateMobile();
    validatePassword();

    // Check if there are no errors
    if (!errors.username && !errors.mobile && !errors.password) {
      // Store user data in localStorage
      const userData = {
        username,
        mobile,
        password,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      // Show an alert and then redirect
      alert("Registration successful! Redirecting to login...");
      navigate("/login");
    }
  };

  return (
    <div className="login-page">
      <div className="welcome-section">
        <h2>Welcome To Register</h2>
        <p>Already have an account?</p>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
      <div className="welcome-section2">
        <h2>Register</h2>
        <div style={{marginTop:"20px"}}>
          <label className="login-label" htmlFor="username">
            Username
          </label>
          <br />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            onBlur={validateUsername}
            required
          />
          {errors.username && (
            <div className="error">{errors.username}</div>
          )}
          <br />
          <label className="login-label" htmlFor="mobile">
            Mobile No
          </label>
          <br />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={mobile}
            onChange={handleMobileChange}
            onBlur={validateMobile}
            required
          />
          {errors.mobile && (
            <div className="error">{errors.mobile}</div>
          )}
          <br />
          <label className="login-label" htmlFor="password">
            Password
          </label>
          <br />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={validatePassword}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <div className="error">{errors.password}</div>
          )}
          <br />
        </div>
        <div>
          <button className="LoginBtn" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
