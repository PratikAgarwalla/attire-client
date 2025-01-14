import axios from "axios";

export const addAddressAPI = async ({ address, token }) => {
  console.log(address, token);
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/address/addAddress`;
    console.log(url);
    const response = await axios({
      method: "post",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        address,
      },
      withCredentials: true,
    });

    if (response.data && response.data.data && response.data.data.user) {
      return response.data;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error adding new address:", error);
    throw new Error("Error adding new address");
  }
};

export const updateAddressAPI = async ({ address, token }) => {
  try {
    const url = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/address/updateAddress`;
    const response = await axios({
      method: "patch",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        address,
      },
      withCredentials: true,
    });

    if (response.data && response.data.data && response.data.data.user) {
      return response.data;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error updating address:", error);
    throw new Error("Error updating address");
  }
};
