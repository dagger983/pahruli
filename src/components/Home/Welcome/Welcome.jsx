import React from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div className="welcome-page">
      <div className="content">
        <h1>
          Welcome to <br /> Pahruli Fruits
        </h1>
        <p>
          Discover the freshest fruit salads, <br />
          weight gain and weight loss salads,
          <br />
          and healthy nuts with our wide selection of fruit salads.
        </p>
        <Link to="/products">
        <button>Order Now</button>
        </Link>
        
      </div>
    </div>
  );
};

export default Welcome;
