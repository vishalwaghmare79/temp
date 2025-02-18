import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create a new category
export const createCategory = async (formData) => {
    const res = await axios.post(`${API_BASE_URL}/api/v1/category/create-category`, formData);
    return res.data;
  };

// Get all categories
export const getAllCategories = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/v1/category/get-category`);
  return res.data;
};

// Update a category
export const updateCategory = async (id, formData) => {
    const res = await axios.put(`${API_BASE_URL}/api/v1/category/update-category/${id}`, formData);
    return res.data;
  };
  

// Delete a category
export const deleteCategory = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/api/v1/category/delete-category/${id}`);
  return res.data;
};