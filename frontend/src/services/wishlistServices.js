import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch Wishlist
export const fetchWishlist = async (token) => {
  try {    
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/wishlist/get-wishlist`,{
        headers: {
          Authorization : token
        }
    });
    return data?.wishlistItems;
  } catch (error) {
    console.error("Error fetching wishlist items", error);
    throw error;
  }
};

// Add to Wishlist
export const addToWishlist = async (productId) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/v1/wishlist/add-wishlist`, {
      productId,
    });
    return data;
  } catch (error) {
    console.error("Error adding product to wishlist", error);
    throw error;
  }
};

// Remove from Wishlist
export const removeFromWishlist = async (wishlistItemId) => {
  try {    
    const { data } = await axios.delete(`${API_BASE_URL}/api/v1/wishlist/remove-wishlist/${wishlistItemId._id}`);
    return data;
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    throw error;
  }
};