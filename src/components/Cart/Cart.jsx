import React, { useState, useEffect } from 'react';
import './Cart.css';
import { FaTrash } from 'react-icons/fa';

const Cart = ({ isOpen, cartItems, removeFromCart, updateQuantity, onClose }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemoveClick = (itemId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(itemId);
    }
  };

  const getCartSummary = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      const product = products.find((product) => product.id === item.id);
      return sum + (product ? product.variants.find((v) => v.weight === item.selectedWeight)?.price * item.quantity : 0);
    }, 0);
    return subtotal.toFixed(2);
  };

  if (loading) {
    return <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>Loading...</div>;
  }

  if (error) {
    return <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>Error loading products: {error}</div>;
  }

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`} role="dialog" aria-labelledby="cart-title" aria-modal="true">
      <div className="cart-content">
        <button className="close-button" onClick={onClose} aria-label="Close cart">
          ✕
        </button>
        <h2 id="cart-title">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p style={{ fontWeight: '400', marginTop: '10px', textAlign: 'left' }}>
            Your cart is empty 😢<br /> Add some quality products to make it yours... 😎!
          </p>
        ) : (
          cartItems.map((item) => {
            const product = products.find((product) => product.id === item.id);
            if (!product) return null;
            return (
              <div key={item.id} className="cart-item" role="listitem">
                <img src={product.img} alt={product.name} className="item-image" />
                <div className="item-details">
                  <p style={{ fontWeight: '400', marginTop: '10px' }}>{product.name}</p>
                  <p style={{ fontWeight: '400', marginTop: '10px' }}>Weight: {item.selectedWeight}</p>
                  <div className="quantity-selector">
                    <button
                      onClick={() => handleQuantityChange(item, -1)}
                      aria-label={`Decrease quantity of ${product.name}`}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item, 1)}
                      aria-label={`Increase quantity of ${product.name}`}
                    >
                      +
                    </button>
                  </div>
                  <p style={{ fontWeight: '400', marginTop: '10px' }}>
                    Price: ₹{product.variants.find((v) => v.weight === item.selectedWeight)?.price}
                  </p>
                </div>
                <FaTrash
                  style={{ color: 'red' }}
                  className="remove-button"
                  onClick={() => handleRemoveClick(item.id)}
                  aria-label={`Remove ${product.name} from cart`}
                />
              </div>
            );
          })
        )}
        <div className="cart-summary">
          <p>Subtotal: ₹{getCartSummary()}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
