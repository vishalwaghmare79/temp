import React from "react";
import { motion } from "framer-motion";

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      className="flex items-center bg-white shadow-lg rounded-lg overflow-hidden p-4 transition-all"
    >
      {/* Category Image */}
      <img
        src={category.image.url}
        alt={category.name}
        className="w-24 h-24 object-cover rounded-lg"
      />

      {/* Category Details */}
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
        <p className="text-sm text-gray-500">Explore amazing products</p>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
