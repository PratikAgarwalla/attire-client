import axios from "axios";
import { useAuth } from "../context/AuthProvider";

export const getUser = async (id) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${id}`;

    const response = await axios({
      method: "get",
      url: url,
    });

    if (response.data && response.data.data && response.data.data.user) {
      return response.data.data.user;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Error fetching user");
  }
};

export const loginAPI = async ({ email, password }) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`;

    const response = await axios({
      method: "post",
      url: url,
      data: {
        email,
        password,
      },
      withCredentials: true,
    });

    if (response.data && response.data.data && response.data.data.user) {
      return response.data;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error("Error logging in user");
  }
};

export const signupAPI = async (data) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/signup`;

    const response = await axios({
      method: "post",
      url: url,
      data,
      withCredentials: true,
    });

    if (response.data && response.data.data && response.data.data.user) {
      return response.data;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred during signup");
    }
  }
};

export const forgotPasswordAPI = async (email) => {
  try {
    const url = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/users/forgotPassword`;
    const response = await axios({
      method: "post",
      url: url,
      data: {
        email: email,
      },
    });
    if (response.data.status == "success") {
      return true;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};

export const resetPasswordAPI = async ({
  password,
  confirmPassword,
  token,
}) => {
  try {
    const url = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/users/resetPassword/${token}`;
    const response = await axios({
      method: "post",
      url: url,
      data: {
        password,
        confirmPassword,
      },
    });
    if (response.data && response.data.data && response.data.data.user) {
      return response.data;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};

export const updatePasswordAPI = async ({
  currentPassword,
  password,
  confirmPassword,
  token,
}) => {
  try {
    const url = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/users/updatePassword`;
    const response = await axios({
      method: "patch",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`, // Include the bearer token in the headers
      },
      data: {
        currentPassword,
        password,
        confirmPassword,
      },
    });
    if (response.data && response.data.data && response.data.data.user) {
      return response.data;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};

export const updateUserAPI = async ({ data, token }) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/updateUser`;
    const response = await axios({
      method: "patch",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`, // Include the bearer token in the headers
      },
      data,
    });
    if (response.data && response.data.data && response.data.data.user) {
      return response.data;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};

export const authAPI = async () => {
  try {
    const url = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/users/isAuthenticated`;

    const response = await axios({
      method: "get",
      url: url,
      withCredentials: true,
    });

    console.log("response : ", response);

    if (response.data && response.data.data && response.data.data.user) {
      return response.data.data.user;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.log("error", error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};
