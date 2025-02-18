import React, { useState, useEffect } from "react";
import { getAllCategories } from "../services/categoryService";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import useAuth from './../hooks/useAuth';

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const { auth } = useAuth();
  const { token } = auth;

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {      
      const res = await getAllCategories();
      if (res.success) {
        setCategories(res.categories);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts(token);
      if (res.success) {
        setProducts(res.products);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredProducts = products.filter(
    (product) =>
      (!selectedCategory || product.category?._id === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (Categories) */}
      <div className="w-1/4 p-6 bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Filter by Category</h2>
        <div className="space-y-3">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className={`block w-full py-2 px-4 text-left rounded-lg transition-colors duration-300 ${
                selectedCategory === category._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {/* Search Bar */}
        <div className="flex space-x-2 mb-8">
          <input
            type="text"
            placeholder="Search by keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Search
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;