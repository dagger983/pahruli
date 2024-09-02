import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <>
      <div className="footer-main">
        <div>
          <p
            style={{ color: "#107070", marginBottom: "10px", fontSize: "30px" }}
          >
            Address
          </p>
          <h3 style={{ fontWeight: "400" }}>
            45, Royal Reed Layout, <br />
            Hulimangala Main Road,
            <br /> Electronic City Phase-1,
            <br /> Bangalore
          </h3>
        </div>
        <div>
          <p
            style={{ color: "#107070", marginBottom: "10px", fontSize: "30px" }}
          >
            Follow Us
          </p>
          <div className="social-link">
            <p>CONNECT WITH US ON SOCIAL MEDIA</p>
            <div className="social-link2">
              <img src="/fb.webp" alt="Facebook" />
              <a href="https://www.instagram.com/pahrulifoods?igsh=dGswa2dtZzhhZ2Y3">
                <img src="/instagram.webp" alt="Instagram" />
              </a>
              <img src="/twitter.webp" alt="Twitter" />
            </div>
          </div>
        </div>
        <div>
          <p
            style={{ color: "#107070", marginBottom: "10px", fontSize: "30px" }}
          >
            Contact
          </p>
          <h3 style={{ fontWeight: "400" }}>
            <a
              href="tel:+919791522333"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Phone no : +919791522333
            </a>
          </h3>
        </div>
      </div>
      <div className="footer-snd">
        <p>
          © {currentYear} All Rights Reserved By Pahruli Foods Private Limited
        </p>
      </div>
    </>
  );
};

export default Footer;
