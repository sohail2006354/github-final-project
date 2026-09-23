import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedNodes, setAddedNodes] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" }
      ]
    },
    {
      category: "Aromatic House Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1000", description: "Calming scent, aids sleep.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729800070-cf4b0288b1e5?q=80&w=1000", description: "Sweet fragrance, boosts mood.", cost: "$18" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedNodes((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <div className="navbar" style={{ backgroundColor: '#4CAF50', padding: '15px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Paradise Nursery</h2>
        <button onClick={() => setShowCart(!showCart)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer' }}>
          🛒 Cart ({totalQuantity})
        </button>
      </div>

      {!showCart ? (
        <div className="product-grid" style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h1>{categoryObj.category}</h1>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {categoryObj.plants.map((plant, plantIndex) => (
                  <div key={plantIndex} className="product-card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '200px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>{plant.cost}</strong></p>
                    <button 
                      onClick={() => handleAddToCart(plant)} 
                      disabled={addedNodes[plant.name] || cartItems.some(item => item.name === plant.name)}
                      style={{ padding: '8px 12px', cursor: 'pointer' }}
                    >
                      {addedNodes[plant.name] || cartItems.some(item => item.name === plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;