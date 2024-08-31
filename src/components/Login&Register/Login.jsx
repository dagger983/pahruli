import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ mobile: "", password: "" });

  const navigate = useNavigate(); // Use useNavigate to programmatically navigate

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
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

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate fields
    validateMobile();
    validatePassword();

    // Check if there are no errors
    if (!errors.mobile && !errors.password) {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (
        storedUser &&
        storedUser.mobile === mobile &&
        storedUser.password === password
      ) {
        alert("Login successful! Redirecting to home...");
        navigate("/");
      } else {
        alert("Invalid mobile number or password.");
      }
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="welcome-section">
          <h2>Welcome To Login</h2>
          <p>Don't have an account?</p>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="welcome-section2">
          <h2>Login</h2>
          <div className="welcome-section3">
            <form onSubmit={handleLogin}>
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
                <p className="error">{errors.mobile}</p>
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
                <p className="error">{errors.password}</p>
              )}
              <br />
              <button className="LoginBtn" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
