import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ShopProductView.css";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const shuffleArray = (array) => {
  const shuffled = array.slice();
  let currentIndex = shuffled.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }
  return shuffled;
};

const calculateDaysBetweenDates = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const timeDiff = Math.abs(endDate - startDate);
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const ShopProductView = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("500g");
  const [activeWeight, setActiveWeight] = useState("500g");
  const [subscriptionType, setSubscriptionType] = useState("weekly");
  const [subscriptionDates, setSubscriptionDates] = useState([null, null]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [submitButtonVisible, setSubmitButtonVisible] = useState(true);
  const [calendarVisible, setCalendarVisible] = useState(true);
  const navigate = useNavigate();

  const isNotSunday = (date) => {
    const day = date.getDay();
    return day !== 0; // 0 is Sunday
  };

  const handleButtonClick = (weight) => {
    setActiveWeight(weight);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/products.json");
        if (!response.ok) throw new Error("Failed to fetch products");
        const allProductsData = await response.json();

        const currentProduct = allProductsData.find(
          (item) => item.id === productId
        );
        if (!currentProduct) throw new Error("Product not found");

        setProduct(currentProduct);

        const shuffledProducts = shuffleArray(
          allProductsData.filter((item) => item.id !== productId)
        ).slice(0, 4);
        setSimilarProducts(shuffledProducts);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = useCallback(() => {
    addToCart(product, quantity, selectedWeight, subscriptionType, {
      subscriptionStartDate: subscriptionDates[0],
      subscriptionEndDate: subscriptionDates[1],
      selectedDays,
    });
  }, [
    product,
    quantity,
    selectedWeight,
    subscriptionType,
    subscriptionDates,
    selectedDays,
    addToCart,
  ]);

  const handleBuyNow = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.username || !user.mobile) {
      alert("Please log in to proceed with the purchase.");
      navigate("/login");
      return;
    }

    const currentPageURL = window.location.href;

    let message = `Username: ${user.username}\n`;
    message += `Mobile: ${user.mobile}\n`;
    message += `Product: ${product.name}\n`;
    message += `Quantity: ${quantity}\n`;
    message += `Weight: ${selectedWeight}\n`;
    message += `Subscription Type: ${subscriptionType}\n`;

    if (subscriptionType === "weekly") {
      message += `Subscription Days: ${selectedDays.join(", ")}\n`;
    } else if (
      subscriptionType === "monthly" ||
      subscriptionType === "customize"
    ) {
      const numberOfDays = calculateDaysBetweenDates(
        subscriptionDates[0],
        subscriptionDates[1]
      );
      message += `Subscription Dates: ${subscriptionDates[0].toLocaleDateString()} to ${subscriptionDates[1].toLocaleDateString()}\n`;
      message += `Number of Days: ${numberOfDays}\n`;
    }

    message += `Page URL: ${currentPageURL}\n`;

    const whatsappNumber = "6384311620";
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
    window.location.reload();
  }, [
    product,
    quantity,
    selectedWeight,
    subscriptionType,
    subscriptionDates,
    selectedDays,
    navigate,
  ]);

  const handleSubmitSubscription = () => {
    console.log("Subscription Submitted", {
      product,
      quantity,
      selectedWeight,
      subscriptionType,
      subscriptionDates,
      selectedDays,
    });
    setSubmitButtonVisible(false);
    setCalendarVisible(false);
    alert(
      "All set! Click 'Buy Now' to complete your purchase and enjoy your new item."
    );
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const toggleDaySelection = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleDateRangeChange = (dates) => {
    setSubscriptionDates(dates);
  };

  const handleSubscriptionTypeChange = (type) => {
    setSubscriptionType(type);
    if (type !== "weekly") {
      setSubscriptionDates([new Date(), new Date()]);
    }
  };

  const minDate = new Date();

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <RotatingLines
          strokeColor="rgb(19, 97, 60)"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <div className="product-page-container">
        <button className="back-btn" onClick={() => navigate("/products")}>
          Back
        </button>
        {product ? (
          <>
            <div className="shop-product-view">
              <div className="product-container">
                <div className="product-details">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="shop-product-image"
                  />
                </div>
                <div className="product-info">
                  <h2>{product.name}</h2>
                  <p>
                    Rs: ₹
                    {
                      product.variants.find(
                        (v) => v.weight === selectedWeight
                      )?.price
                    }
                    /-
                  </p>
                  <div className="quantity-section">
                    <p>Quantity</p>
                    <button onClick={() => handleQuantityChange(-1)}>-</button>
                    <input type="text" value={quantity} readOnly />
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="weight-section">
                    <p>Select Weight</p>
                    {product.variants.map((variant) => (
                      <button
                        key={variant.weight}
                        onClick={() => setSelectedWeight(variant.weight)}
                        className={
                          selectedWeight === variant.weight ? "active" : ""
                        }
                      >
                        {variant.weight}
                      </button>
                    ))}
                  </div>
                  <div className="subscription-section">
                    <p>Subscription</p>
                    <button
                      onClick={() => handleSubscriptionTypeChange("weekly")}
                      className={`subscription-button ${
                        subscriptionType === "weekly" ? "active" : ""
                      } additional-classname`}
                    >
                      Weekly
                    </button>
                    <button
                      onClick={() => handleSubscriptionTypeChange("monthly")}
                      className={`subscription-button ${
                        subscriptionType === "monthly" ? "active" : ""
                      } additional-classname`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() =>
                        handleSubscriptionTypeChange("customize")
                      }
                      className={`subscription-button ${
                        subscriptionType === "customize" ? "active" : ""
                      } additional-classname`}
                    >
                      Customize
                    </button>

                    {(subscriptionType === "monthly" ||
                      subscriptionType === "customize") &&
                      calendarVisible && (
                        <div className="date-selection">
                          <p>Select Subscription Dates:</p>
                          <DatePicker
                            selected={subscriptionDates[0]}
                            onChange={handleDateRangeChange}
                            startDate={subscriptionDates[0]}
                            endDate={subscriptionDates[1]}
                            selectsRange
                            inline
                            dateFormat="dd/MM/yyyy"
                            minDate={minDate}
                            showYearDropdown={subscriptionType === "customize"}
                            scrollableYearDropdown={subscriptionType === "customize"}
                            filterDate={isNotSunday} // Add this prop to disable Sundays
                          />
                        </div>
                      )}

                    {subscriptionType === "weekly" && (
                      <div className="day-selection">
                        <p>Select Days of the Week:</p>
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                        ].map((day) => (
                          <label key={day} style={{ cursor: "pointer" }}>
                            <input
                              style={{ marginRight: "10px", cursor: "pointer" }}
                              type="checkbox"
                              checked={selectedDays.includes(day)}
                              onChange={() => toggleDaySelection(day)}
                            />
                            {day}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {submitButtonVisible && (
                    <button
                      onClick={handleSubmitSubscription}
                      className="submit-button"
                    >
                      Submit
                    </button>
                  )}
                  <div className="buttons">
                    <button
                      onClick={handleAddToCart}
                      className="add-to-cart-button"
                    >
                      Add to Cart
                    </button>
                    <button onClick={handleBuyNow} className="buy-now-button">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="similar-head">Similar Products</h2>
            </div>
            {similarProducts.length > 0 && (
              <div className="similar-products">
                <div className="similar-products-list">
                  {similarProducts.map((item) => (
                    <div key={item.id} className="similar-product-card">
                      <Link to={`/shop-product/${item.id}`} target="_blank">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="similar-product-image"
                        />
                        <br />
                        <h3>{item.name}</h3>
                        <br />
                        <p>
                          Rs: ₹
                          {
                            item.variants.find((v) => v.weight === "500g")
                              ?.price
                          }
                          /-
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p>Product not found</p>
        )}
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default ShopProductView;
