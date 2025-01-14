import axios from "axios";

export const getTopPicks = async (
  category = "",
  mainCategory = "",
  limit = 5
) => {
  try {
    // Construct the URL with protocol and dynamic parameters
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/topPicks/${
      category || ""
    }/${mainCategory || ""}`;

    const response = await axios({
      method: "get",
      url: url,
      params: {
        limit,
      },
    });

    if (response.data && response.data.data && response.data.data.products) {
      return response.data.data.products;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error fetching top products:", error);
    throw new Error("Error fetching top products");
  }
};

export const getProducts = async (category = "", mainCategory = "") => {
  try {
    // Construct the URL with protocol and dynamic parameters
    const url = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/products/collection/${category || ""}/${mainCategory || ""}`;

    const response = await axios({
      method: "get",
      url: url,
    });

    if (response.data && response.data.data && response.data.data.products) {
      return response.data.data.products;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error fetching products");
  }
};

export const getProduct = async (id) => {
  try {
    // Construct the URL with protocol and dynamic parameters
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/${id}`;

    const response = await axios({
      method: "get",
      url: url,
    });

    if (response.data && response.data.data && response.data.data.product) {
      return response.data.data.product;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error fetching a products:", error);
    throw new Error("Error fetching a products");
  }
};

export const getManyProduct = async (productIds) => {
  try {
    const url = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/products?ids=${productIds.join(",")}`;

    const response = await axios({
      method: "get",
      url: url,
      withCredentials: true,
    });

    if (response.data && response.data.data && response.data.data.products) {
      return response.data.data.products;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error fetching many products:", error);
    throw new Error("Error fetching many products");
  }
};
