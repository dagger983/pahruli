import React from "react";
import "./ContactUs.css";
import Footer from "../Footer/Footer";
const Contact = () => {
  return (
    <>
      <div className="contact-us-container">
        <div className="form-container">
          <h2 className="contact-heading">Contact Us</h2>
          <form className="contact-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="First Name"
                className="contact-input contact-input-half"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="contact-input contact-input-half"
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                className="contact-input"
                style={{ marginRight: "10px" }}
              />
              <input type="tel" placeholder="Phone" className="contact-input" />
            </div>
            <textarea
              placeholder="Type your message here..."
              className="contact-textarea"
            ></textarea>
            <button type="submit" className="contact-button">
              SEND
            </button>
          </form>
        </div>
        <div className="image-container">
          <img
            src="/furit-splash main.webp"
            alt="Fruit splash"
            className="contact-image"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
