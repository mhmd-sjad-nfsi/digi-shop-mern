import React from "react";
import { Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage"; // ✨ ایمپورت صفحه سبد خرید
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/common/PrivateRoute"; // ✨
import ProfilePage from "./pages/ProfilePage"; // ✨
import ShippingPage from "./pages/ShippingPage"; // ✨
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage"; // ✨
import OrderPage from "./pages/OrderPage"; // ✨
import AdminRoute from "./components/common/AdminRoute"; // ✨
import UserListPage from "./pages/admin/UserListPage"; // ✨
import UserEditPage from "./pages/admin/UserEditPage"; // ✨
import ProductListPage from "./pages/admin/ProductListPage"; // ✨
import ProductEditPage from "./pages/admin/ProductEditPage"; // ✨
import OrderListPage from "./pages/admin/OrderListPage";
import Paginate from "./components/Paginate";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/search/:keyword" element={<HomePage />} /> {/* ✨ */}
        <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} /> {/* ✨ */}
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✨ مسیرهای محافظت‌شده */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} /> {/* ✨ */}
          <Route path="/order/:id" element={<OrderPage />} /> {/* ✨ */}
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        {/* ✨ مسیرهای محافظت‌شده ادمین */}
        <Route path="" element={<AdminRoute />}>
          <Route path="/admin/users" element={<UserListPage />} />
          <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
          <Route path="/admin/products" element={<ProductListPage />} />
          <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
          <Route path="/admin/orders" element={<OrderListPage />} />{" "}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
