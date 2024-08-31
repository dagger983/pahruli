import React from "react";
import "./MobBanner.css";
const MobBanner = () => {
  return (
    <>
      <div className="MobBanner-main">
        <div className="MobBanner1">
          <img src="/fruit-grid1.webp" alt="" />
        </div>
        <div className="MobBanner2">
          <img src="/fruit-grid2.webp" alt="" />
          <img src="/fruit-grid3.webp" alt="" />
        </div>
        <div className="MobBanner3">
          <div className="MobBadham">
            <img src="/badham.webp" alt="" /><br />
            <img src="/badham.webp" alt="" />
            <img src="/badham.webp" alt="" /> 
            <img src="/badham.webp" alt="" /> <br />
            <img src="/badham.webp" alt="" />
            <img src="/badham.webp" alt="" />
           
          </div>
          <div className="MobBowl">
            <img src="/ani-main.png" alt="" />
          </div>
          <div className="MobCashew">
            <img src="/cashew.webp" alt="" />
            <img src="/cashew.webp" alt="" />
            <img src="/cashew.webp" alt="" />  <br />
            <img src="/cashew.webp" alt="" />
            <img src="/cashew.webp" alt="" />
            <img src="/cashew.webp" alt="" /> <br />
           

          </div>
        </div>
      </div>
    </>
  );
};

export default MobBanner;
