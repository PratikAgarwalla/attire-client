import axios from "axios";

export const createOrderAPI = async ({ token, data }) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/order/createOrder`;
    const response = await axios({
      method: "post",
      url: url,
      data: data,
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
    console.error("Error creating a new order:", error);
    throw new Error("Error creating a new order");
  }
};

export const getOrdersAPI = async ({ token }) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/order/getOrders`;
    const response = await axios({
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.data && response.data.data && response.data.data.orders) {
      return response.data.data.orders;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Error fetching orders");
  }
};
