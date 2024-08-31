import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import "./MobNavbar.css";

const MobNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  const handleCartClick = () => {
    navigate("/mob-cart");
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <div className="mobNavbar">
        <div className="mobNavbar2">
          <img
            src="/Pahruli_Logo.png"
            alt="Pahruli Logo"
            aria-label="Pahruli Logo"
          />
        </div>
        <div className="mobNavbar3">
          <img
            src="/shopping-bag-min.png"
            alt="Cart"
            aria-label="Cart"
            style={{ cursor: "pointer", height: "50px" }}
            onClick={handleCartClick}
          />
          <img
            src="/menu-icon.jpg"
            alt="Menu"
            aria-label="Menu"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            onClick={handleMenuClick}
          />
        </div>
      </div>
      <div className="mobNavbar4">
        <p style={{ textAlign: "center" }}>Contact: 9791522333</p>
      </div>

      {sidebarOpen && (
        <div className="mobSidebar">
          <FaTimes className="close-icon" onClick={closeSidebar} />
          <div>
            {username ? (
              <p>Welcome, {username}</p>
            ) : (
              <Link to="/login" onClick={closeSidebar}><p>Login</p></Link>
            )}
            <Link to="/" onClick={closeSidebar}><p>Home</p></Link>
            <Link to="/products" onClick={closeSidebar}><p>Products</p></Link>
            <Link to="/about-us" onClick={closeSidebar}><p>About Us</p></Link>
            <Link to="/contact" onClick={closeSidebar}><p>Contact</p></Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MobNavbar;
