import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage'; // ✨ ایمپورت صفحه سبد خرید  
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
}

export default App;