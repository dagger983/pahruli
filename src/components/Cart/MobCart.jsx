import React from 'react';
import './MobCart.css';
import { FaTrash } from "react-icons/fa";

const MobCart = ({
  isOpen = false,
  cartItems = [],
  removeFromCart = () => {},
  updateQuantity = () => {},
  onClose = () => {},
}) => {

  // Handle quantity changes
  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  // Calculate the total price
  const calculateTotal = () => 
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className={`mobcart-container ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <div className="mobcart-header">
        <h2>Your Cart - {cartItems.length} items</h2>
      </div>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty 😢 <br /> Add Quality Products To Make it Yours . . . 😎 !</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="mobcart-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <p className="item-name">{item.name}</p>
              <div className="quantity-selector">
                <button
                  onClick={() => handleQuantityChange(item, -1)}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item, 1)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>
            </div>
            <div className="item-price">₹{item.price}</div>
            <FaTrash
              style={{color:'red'}}
              className="remove-button"
              onClick={() => {
                if (window.confirm("Are you sure you want to remove this item from your cart?")) {
                  removeFromCart(item.id);
                }
              }}
              aria-label={`Remove ${item.name} from cart`}
            />
          </div>
        ))
      )}
      <div className="mobcart-total">
        <p>Total:</p>
        <p>₹{calculateTotal()}</p>
      </div>
      
    </div>
  );
};

export default MobCart;
