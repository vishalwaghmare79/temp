import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./admin-dashboard/AdminDashboard";
import UserDashboard from "./user-dashboard/UserDashboard";
import ManageUsers from "./admin-dashboard/ManageUsers";
import Home from "./pages/Home";
import UserProtectedLayout from "./routes/UserProtectedLayout";
import AdminProtectedLayout from "./routes/AdminProtectedLayout";
import Profile from "./user-dashboard/Profile";
import NotFound from "./pages/NotFound";
import Navbar from "./layouts/Navbar";
import ManageCategory from "./admin-dashboard/ManageCategory";
import ManageOrders from "./admin-dashboard/ManageOrders";
import Orders from './user-dashboard/Orders';
import Wishlist from "./user-dashboard/Wishlist";
import Sellproduct from "./user-dashboard/Sellproduct";
import ProductPage from "./pages/ProductPage";
import UpdateProduct from "./components/UpdateProduct";
import ManageProducts from "./components/ManageProducts";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* User Protected Routes */}
        <Route path="/user" element={<UserProtectedLayout />}>
          {/* User Dashboard with Sidebar */}
          <Route path="dashboard" element={<UserDashboard />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="manage-products" element={<ManageProducts />} />
            <Route path="orders" element={<Orders />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="sell-product" element={<Sellproduct />} />
            <Route path="update-product/:id" element={<UpdateProduct />} />
          </Route>
        </Route>

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminProtectedLayout />}>
          <Route path="dashboard" element={<AdminDashboard />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="manage-categories" element={<ManageCategory />} />
            <Route path="manage-products" element={<ManageProducts />} />
            <Route path="manage-orders" element={<ManageOrders />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="update-product/:id" element={<UpdateProduct />} />
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
