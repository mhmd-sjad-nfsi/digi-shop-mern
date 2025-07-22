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
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage'; // ✨
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
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} /> {/* ✨ */}
          <Route path="/profile" element={<ProfilePage />} />
        </Route>


      </Route>
    </Routes>
  );
}

export default App;