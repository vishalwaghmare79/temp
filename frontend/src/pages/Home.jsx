import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { getAllCategories } from "../services/categoryService";
import { getAllProducts } from "../services/productService";
import CategorySlider from "../components/CategorySlider";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // State for products
  const navigate = useNavigate();

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res.success) {
        setCategories(res.categories);
      }
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  // Fetch 8 products
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      if (res.success) {
        // Display only the first 8 products
        setProducts(res.products.slice(0, 8));
      }
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative h-[50vh] flex flex-col items-center justify-center text-white px-6 bg-cover bg-center text-center"
        style={{
          backgroundImage:
            "url('https://assets-global.website-files.com/6152909339c5938b8fdca638/63c4a8350d5e927d49ff9baa_OWE177_HERO_1200x674.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold mb-4"
          >
            Welcome to CampusCart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-lg mb-6"
          >
            Buy & sell pre-owned products and get a good amount with ease.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition"
          >
            Explore Now
          </motion.button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Browse Categories
        </h1>
        <CategorySlider categories={categories} />
      </div>

      {/* Featured Products Section */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Featured Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {/* Explore More Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Explore More
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;