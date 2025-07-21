import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage'; // ✨ ایمپورت صفحه سبد خرید  
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/common/PrivateRoute'; // ✨
import ProfilePage from './pages/ProfilePage'; // ✨
import ShippingPage from './pages/ShippingPage'; // ✨
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />


        {/* ✨ مسیرهای محافظت‌شده */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/shipping" element={<ShippingPage />} />
        </Route>


      </Route>
    </Routes>
  );
}

export default App;