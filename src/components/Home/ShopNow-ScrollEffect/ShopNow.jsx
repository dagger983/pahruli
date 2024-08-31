import React, { useEffect } from "react";
import "./ShopNow.css";
import { Link } from "react-router-dom";
const ShopNow = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const speed = 0.2;
      const zoomSpeed = 0.001;
      const maxZoom = 1.5;

      document.querySelector(".shopnow-splash").style.transform = `translateY(${
        scrollPosition * speed
      }px) scaleX(-1)`;
      document.querySelector(
        ".shopnow-splash2"
      ).style.transform = `translateY(${scrollPosition * speed}px)`;

      const zoomValue = 1 + Math.min(scrollPosition * zoomSpeed, maxZoom - 1);
      document.querySelector(
        ".shopnow-center"
      ).style.transform = `scale(${zoomValue})`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="shopnow-2">
        <h2 style={{ marginTop: "30px" }}>SHOP AT PAHRULI FRUITS</h2>
      </div>

      <div className="shopnow-3">
        <div>
          <img className="shopnow-splash" src="/ani-bowl-splash.webp" alt="" />{" "}
          <br /> <br /> <br /> <br />
          <div>
            <img className="shopnow-bowl" src="/ani-bowl 1.png" alt="" />
          </div>
        </div>
        <div>
          <img className="shopnow-center" src="/ani-bowl-center.png" alt="" />
        </div>
        <br /> <br /> <br /> <br />
        <div>
          <img className="shopnow-splash2" src="/ani-bowl-splash.webp" alt="" />
          <div>
            <img className="shopnow-bowl2" src="/ani-bowl 1.png" alt="" />
          </div>
        </div>
      </div>

      <div className="shopNowBtn">
        <Link to="/products">
        <button>Shop Now</button>
        </Link>
        
      </div>
    </>
  );
};

export default ShopNow;
