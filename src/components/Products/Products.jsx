import React, { useState, useEffect } from "react";
import "./Products.css";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/shop-product/${productId}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`Product "${product.name}" added successfully!`);
  };

  return (
    <>
      <div className="products-main">
        <div className="products-page">
          <div className="products-content">
            <h2>Fresh and Healthy Fruit Salad Delivery</h2>
          </div>
        </div>
      </div>

      <div className="products-main2">
        <div>
          <h2>All Products</h2>
        </div>
        <div className="products-container-main">
          {products.map((product) => (
            <div
              key={product.id}
              className="products-container"
            >
              <img
                src={product.img}
                alt={product.name}
                className="products-image"
                onClick={() => handleProductClick(product.id)}
              />
              <p
                style={{ marginTop: "30px", fontSize: "24px", marginBottom: "30px", cursor: "pointer" }}
                onClick={() => handleProductClick(product.id)}
              >
                {product.name}
              </p>
              <button onClick={() =>  handleProductClick(product.id)}>For More Details</button>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Products;
