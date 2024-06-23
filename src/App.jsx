// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MicButton from './MicButton';
import UnlockButton from './UnlockButton';
import Options from './Options';
import ShoppingCart from './ShoppingCart';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MainPage = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showNewButton, setShowNewButton] = useState(false);

  const handleMicButtonClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      if (clickCount === 1) {
        setTimeout(() => {
          setShowNewButton(true);
        }, 1000);
      }
    }, 1000);
  };

  return (
    <div className="cart-container">
      <div className="cart-header-container">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="cart-logo" />
        </Link>
        <Link to="/shoppingcart">
          <img src="/shopcart.png" alt="shopcart" className="cart-shopcart" />
        </Link>
      </div> 
      
    <main className="main">
      
      <div className="left-content">
        

        
        <motion.h1
          className="title"
          initial={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 1.0 }}
        >
          moody fits
        </motion.h1>
        
        <h1 className="vibe">vibe check</h1>
        <hr className="separator" />
        <p className="description">
          tap the microphone button and describe your event in 5 seconds.<br />
          our AI will find the perfect outfit for you.
        </p>
      </div>
      <div className="right-content">
        {showNewButton && <UnlockButton />}
        <MicButton onClick={handleMicButtonClick} />
      </div>
    </main>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/options" element={<Options />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}
