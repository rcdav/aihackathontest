import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Preferences from './Preferences';
import { fetchProductSuggestions } from './humeapi';  // Import the API function
import './App.css';

function ProductSearch() {
  const [product, setProduct] = useState(null);

  const handleSearch = async () => {
    const productData = await fetchProductSuggestions('I need a blue summer dress');
    setProduct(productData);
  };

  return (
    <div>
      <h1>Product Search</h1>
      <button onClick={handleSearch}>Search for Products</button>
      {product && <div>{JSON.stringify(product)}</div>}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
        <Link to="/preferences">Preferences</Link>
        <Link to="/product-search">Product Search</Link> {/* Add a link to the new route */}
      </nav>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/product-search" element={<ProductSearch />} /> {/* Add the new route */}
      </Routes>
    </Router>
  );
}
