import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const PCNavbar = ({ onCartClick }) => {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);
  return (
    <div className="pahruli-pc-navbar">
      <div className="pahruli-navbar-main">
        <div className="pahruli-navbar">
          <div>
            <img className="pahruli-logo" src="/Pahruli_Logo.png" alt="Logo" />
          </div>
          <div className="pahruli-navbar3">
            <div className="contact-num">
              <a href="tel:+919791522333">
                <p>Contact :</p>
              </a>
            </div>
            <div className="cart-icon">
              <img
                src="/shopping-bag-min.png"
                alt="Cart"
                style={{ cursor: "pointer", height: "30px" }}
                onClick={onCartClick}
                aria-label="Open cart"
              />
            </div>
            <div className="pahruli-navbar2">
              <Link to="/">
                <p>Home</p>
              </Link>
              <Link to="/products">
                <p>Products</p>
              </Link>
              <Link to="/about-us">
                <p>About Us</p>
              </Link>
              <Link to="/contact">
                <p>Contact</p>
              </Link>
              {username ? (
                <p>Welcome, {username}</p>
              ) : (
                <Link to="/login">
                  <p>Login</p>
                </Link>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCNavbar;
