import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [pincode, setPincode] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    mobile: "",
    password: "",
    pincode: ""
  });

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateFields = () => {
    let isValid = true;
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!pincode.trim()) {
      newErrors.pincode = "Pincode is required";
      isValid = false;
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (validateFields()) {
      const userData = { username, mobile, password, pincode };
      localStorage.setItem("user", JSON.stringify(userData));

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
        <div style={{ marginTop: "20px" }}>
          <label className="login-label" htmlFor="username">
            Username
          </label> <br />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => validateFields()}
            required
          />
          {errors.username && <div className="error">{errors.username}</div>}
          <br />
          <label className="login-label" htmlFor="mobile">
            Mobile No
          </label> <br />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            onBlur={() => validateFields()}
            required
          /> <br />
          {errors.mobile && <div className="error">{errors.mobile}</div>}
          <br />
          <label className="login-label" htmlFor="pincode">
            Pincode
          </label> <br />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            onBlur={() => validateFields()}
            required
          />
          {errors.pincode && <div className="error">{errors.pincode}</div>}
          <br />
          <label className="login-label" htmlFor="password">
            Password
          </label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => validateFields()}
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
          {errors.password && <div className="error">{errors.password}</div>}
          
          <button className="LoginBtn" onClick={handleRegister} disabled={!username || !mobile || !password || !pincode}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
