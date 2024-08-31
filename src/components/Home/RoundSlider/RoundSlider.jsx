import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import "./ProductSlider.css"; // Use a separate CSS file for this component
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RoundSlider = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="arrow arrow-next" onClick={onClick}>
        <FaChevronRight />
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="arrow arrow-prev" onClick={onClick}>
        <FaChevronLeft />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          infinite: true,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          infinite: true
        },
      },
    ],
  };

  const handleProductClick = (id) => {
    navigate(`/shop-product/${id}`);
  };

  return (
    <><div className="product-slider">
    <h2>Shop by Products</h2>
    <div>
      <Slider {...settings}>
        {products.map((product) => (
          <div
            key={product.id}
            className="slider-item"
            onClick={() => handleProductClick(product.id)}
          >
            <img
              src={product.img}
              alt={product.name}
              className="product-slider-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  </div>
  <br />
  <br />
    </>
    
  );
};

export default RoundSlider;
