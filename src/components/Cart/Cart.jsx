import React, { useState, useEffect } from 'react';
import './Cart.css';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Modal from 'react-modal'; // Assuming you're using react-modal

const Cart = ({ isOpen, cartItems, removeFromCart, updateQuantity, onClose }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    city: '',
    state: '',
    zip: '',
  });

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

  const handleRemoveClick = (itemId, weight) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(itemId, weight);
    }
  };

  const getCartSummary = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      const product = products.find((product) => product.id === item.id);
      const price = product
        ? product.variants.find((v) => v.weight === item.selectedWeight)?.price
        : 0;
      return sum + price * item.quantity;
    }, 0);
    return subtotal.toFixed(2);
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleBuyNow = () => {
    setIsModalOpen(true);
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("User information is missing. Please log in.");
      return;
    }

    let message = `Username: ${user.username}\n`;
    message += `Mobile: ${user.mobile || 'N/A'}\n`;
    message += `Shipping Address:\n`;
    message += `Address: ${shippingDetails.address}\n`;
    message += `City: ${shippingDetails.city}\n`;
    message += `State: ${shippingDetails.state}\n`;
    message += `Pincode: ${shippingDetails.zip}\n`;
    message += `Cart Details:\n`;

    cartItems.forEach((item) => {
      const product = products.find((product) => product.id === item.id);
      if (product) {
        message += `\nProduct: ${product.name}\n`;
        message += `Weight: ${item.selectedWeight}\n`;
        message += `Quantity: ${item.quantity}\n`;
        message += `Price: ₹${product.variants.find((v) => v.weight === item.selectedWeight)?.price}\n`;
        if (item.subscriptionType) {
          message += `Subscription Type: ${item.subscriptionType}\n`;
        }
      }
    });

    message += `\nTotal Quantity: ${getTotalQuantity()}\n`;
    message += `Subtotal: ₹${getCartSummary()}\n`;

    const whatsappNumber = "6384311620";
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
    setIsModalOpen(false); // Close the modal after submission
  };

  const calculateDaysBetweenDates = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const timeDiff = Math.abs(endDate - startDate);
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  if (loading) {
    return <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>Loading...</div>;
  }

  if (error) {
    return <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>Error loading products: {error}</div>;
  }

  return (
    <>
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
                <div key={`${item.id}-${item.selectedWeight}`} className="cart-item" role="listitem">
                  <img src={product.img} alt={product.name} className="item-image" />
                  <div className="item-details">
                    <p style={{ fontWeight: '400', marginTop: '10px' }}>{product.name}</p>
                    <p style={{ fontWeight: '400', marginTop: '10px' }}>Weight: {item.selectedWeight}</p>
                    <p style={{ fontWeight: '400', marginTop: '10px' }}>
                      Price: ₹{product.variants.find((v) => v.weight === item.selectedWeight)?.price}
                    </p>
                    <br />
                    <br />
                    {item.subscriptionType && (
                      <div className="subscription-details">
                        <p>Subscription Type: {item.subscriptionType}</p>
                      </div>
                    )}
                  </div>
                  <FaTrash
                    style={{ color: 'red' }}
                    className="remove-button"
                    onClick={() => handleRemoveClick(item.id, item.selectedWeight)}
                    aria-label={`Remove ${product.name} with weight ${item.selectedWeight} from cart`}
                  />
                </div>
              );
            })
          )}
          <div className="cart-summary">
            <p>Subtotal: ₹{getCartSummary()}</p>
            <p>Total Quantity: {getTotalQuantity()}</p>
            <button className="buy-now-button" onClick={handleBuyNow} aria-label="Buy now">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Shipping Details"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h3>Enter Shipping Details</h3>
        <div className="modal-style">
          <form onSubmit={handleSubmitAddress}>
            <label>
              <input
                type="text"
                placeholder="Door No and Street"
                required
                value={shippingDetails.address}
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, address: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              <input
                type="text"
                value={shippingDetails.city}
                required
                placeholder="City"
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, city: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              <input
                type="text"
                value={shippingDetails.state}
                placeholder="State"
                required
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, state: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              <input
                type="text"
                value={shippingDetails.zip}
                placeholder="Pincode"
                required
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, zip: e.target.value })
                }
              />
            </label>
            <br />
            <button type="submit">Submit Address</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>Close</button>
          </form>
        </div>
      </Modal>
    </>
  );
};

Cart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      selectedWeight: PropTypes.string.isRequired,
      subscriptionType: PropTypes.string,
      subscriptionDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
      selectedDays: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Cart;
