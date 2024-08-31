import React from "react";
import "./About.css";
import Footer from "../Footer/Footer"
const About = () => {
  return (
    <>
      <div className="about-main">
        <div className="about-page">
          <div className="about-content">
            <h2>Fresh and Healthy Fruit Salad Delivery</h2>
          </div>
        </div>
      </div>

      <div className="about-main2">
        <div>
          <div className="about-text">
            <h2>Nourishing Lives, One Fruit Bowl at a Time</h2>
            <p>
              Welcome to Pahruli, your trusted partner in health and <br />
              sustainability, currently serving the vibrant community of <br />
              Electronic City Phase 1 & 2, Bangalore. Launched in September
              2024, <br />
              Pahruli is more than just a fresh fruit delivery service—it’s a{" "}
              <br />
              lifestyle choice that empowers you to embrace a healthier, more{" "}
              <br />
              sustainable way of living.
            </p>
          </div>

          <div className="about-text">
            <h2> A Subscription Service Designed for Your Convenience</h2>
            <p>
              Flexible Plans <br />
              Maintaining a healthy routine can be challenging <br />
              with city life’s hustle and bustle. Our subscription service{" "}
              <br />
              offers convenience by delivering a fresh fruit bowl to your home{" "}
              <br />
              daily. Choose from daily, weekly, or monthly plans to suit your{" "}
              <br />
              needs. Enjoy the best of nature without worrying about shopping or{" "}
              <br />
              preparation, saving time and money while savoring the fruits you
              love
            </p>
          </div>

          <div className="about-text">
            <h2>A Commitment to Sustainability</h2>
            <p>
              Eco-Friendly Practices <br />
              We’re not just focused on your health—we’re <br />
              also committed to the health of our planet. Sustainability is{" "}
              <br />
              crucial for preserving Earth's beauty and resources. We source{" "}
              <br />
              fruits from local farms to reduce our carbon footprint and support{" "}
              <br />
              the local economy. Our packaging is eco-friendly, ensuring your{" "}
              <br />
              nutrition doesn’t come at the planet’s expense. By choosing
              Pahruli, you contribute to a greener world.
            </p>
          </div>

          <div className="about-text">
            <h2> Join the Pahruli Community</h2>
            <p>
              Choosing Pahruli means opting for a healthier, happier life. It’s
              a small change with a big impact on your health and the planet. <br />
              Join us today and make fresh fruits a delicious, daily ritual. <br />
              Together, we can build a brighter, more sustainable future, one 
              fruit bowl at a time. <br /> <br />
              Experience the Pahruli difference—because <br />
              every morning deserves a fresh start. A simple alternative for an <br />
              unhealthy breakfast, providing great fuel to start your day.
            </p>
          </div>
        </div>
        <div >
            <div  className="about-img">
                <img src="/about 1.png" alt="" /> <br />
                <img className="aboutbowl-img" src="/about2.png" alt="" /> <br />
                <img src="/about3.png" alt="" />
            </div>
        </div>
      </div>
       <br />
       <br />
      <Footer/>
    </>
  );
};

export default About;
