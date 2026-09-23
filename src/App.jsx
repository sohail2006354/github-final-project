import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="content">
            <h1>Paradise Nursery</h1>
            <p>Where Greenery Meets Serenity</p>
            <button className="get-started-btn" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
          <AboutUs />
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;