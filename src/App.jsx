import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import PCNavbar from './components/Home/Navbar/PCNavbar';
import MobNavbar from './components/Home/Navbar/MobNavbar';
import Welcome from './components/Home/Welcome/Welcome';
import ShopNow from './components/Home/ShopNow-ScrollEffect/ShopNow';
import PCBanner from './components/Home/BannerAndAnimation/Banner';
import MobBanner from './components/Home/BannerAndAnimation/MobBanner';
import Footer from './components/Footer/Footer';
import RoundSlider from './components/Home/RoundSlider/RoundSlider';
import Products from './components/Products/Products';
import About from './components/About Us/About';
import Contact from './components/Contact/Contact';
import Cart from './components/Cart/Cart';
import MobCart from './components/Cart/MobCart';
import ShopProductView from './components/ProductPage/ShopProductView';
import Login from './components/Login&Register/Login';
import Register from './components/Login&Register/Register';
import NavTop from './components/Home/NavTop/NavTop';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product, quantity, selectedWeight, subscriptionType, subscriptionDetails) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === product.id && i.selectedWeight === selectedWeight);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === product.id && i.selectedWeight === selectedWeight
            ? { ...i, quantity: i.quantity + quantity, subscriptionType, subscriptionDetails }
            : i
        );
      }
      return [
        ...prevItems,
        { ...product, quantity, selectedWeight, subscriptionType, subscriptionDetails }
      ];
    });
  
    if (isMobile) {
      alert(`Product "${product.name}" added successfully!`);
    } else {
      openCart();
    }
  };
  

  const removeFromCart = (itemId, weight) => {
    setCartItems(prevItems => prevItems.filter(item => !(item.id === itemId && item.selectedWeight === weight)));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const renderNavbar = () => (isMobile ? <MobNavbar /> : <PCNavbar onCartClick={openCart} />);

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

  return (
    <>
      {isCartOpen && (
        <Cart
          isOpen={isCartOpen}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          onClose={closeCart}
        />
      )}
      <Routes>
        <Route path="/" element={<>
        <NavTop/>
          {renderNavbar()}
          <Welcome />
          <ShopNow />
          {isMobile ? <MobBanner /> : <PCBanner />}
          <RoundSlider />
          <Footer />
        </>} />
        <Route path="/products" element={<>
          <NavTop/>
          {renderNavbar()}
          <Products addToCart={addToCart} />
        </>} />
        <Route path="/about-us" element={<>
          <NavTop/>
          {renderNavbar()}
          <About />
        </>} />
        <Route path="/contact" element={<>
          <NavTop/>
          {renderNavbar()}
          <Contact />
        </>} />
        <Route path="/shop-product/:productId" element={<>
          <NavTop/>
          {renderNavbar()}
          <ShopProductView addToCart={addToCart} />
        </>} />
        <Route path="/mob-cart" element={<MobCart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          onClose={closeCart}
        />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
