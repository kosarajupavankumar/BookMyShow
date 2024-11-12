import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "x-access-token": `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

const backendEndPoint =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3000/"; // Default to localhost if not set

export const registerUser = async (userObj) => {
  try {
    if (
      !userObj.name ||
      !userObj.email ||
      !userObj.password ||
      !userObj.userId
    ) {
      throw new Error("Missing required user information");
    }

    const response = await axiosInstance.post(
      `${backendEndPoint}/users/register`,
      {
        name: userObj.name,
        email: userObj.email,
        password: userObj.password,
        userId: userObj.userId,
        role: "seller",
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Unexpected response code: ${response.status}`);
    }
  } catch (err) {
    if (err.response?.status === 400) {
      console.error("User already exists:", err.message || err);
      return { error: "User already exists" };
    }
    console.error("Registration failed:", err.message || err);
    return (
      err.response?.data || { error: "An error occurred during registration" }
    );
  }
};

export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post(
      `${backendEndPoint}/users/login`,
      {
        email: value.email,
        password: value.password,
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const ForgetPassword = async (value) => {
  try {
    const response = await axiosInstance.patch(
      `${backendEndPoint}/users/forgotPassword`,
      {
        email: value.email,
      }
    );

    return response;
  } catch (err) {
    return err.response;
  }
};

export const ResetPassword = async (value) => {
  try {
    const response = await axiosInstance.patch(
      `${backendEndPoint}/users/resetpassword`,
      {
        otp: value.otp,
        password: value.password,
      }
    );

    return response;
  } catch (err) {
    return err.response;
  }
};
