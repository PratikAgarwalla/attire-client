import axios from "axios";

export const addItemAPI = async ({
  productId,
  size,
  quantity,
  price,
  token,
}) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/addItem`;
    const response = await axios({
      method: "post",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        productId,
        size,
        quantity,
        price,
      },
      withCredentials: true,
    });

    if (response.data && response.data.data && response.data.data.user) {
      return response.data;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw new Error("Error adding item to cart");
  }
};

export const updateCartAPI = async ({ cartItems, token }) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/updateCart`;
    const response = await axios({
      method: "patch",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { cart: cartItems },
      withCredentials: true,
    });

    if (response.data && response.data.data && response.data.data.user) {
      return response.data;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error updating cart items:", error);
    throw new Error("Error updating cart items");
  }
};

export const clearCartAPI = async ({ token }) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/clearCart`;
    const response = await axios({
      method: "delete",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.data && response.data.data && response.data.data.user) {
      return response.data;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error clearing the cart:", error);
    throw new Error("Error clearing the cart");
  }
};
