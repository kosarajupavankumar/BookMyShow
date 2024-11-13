import { axiosInstance } from "./users.js";

const backendEndPoint = process.env.REACT_APP_BACKEND_URL;

const handleResponse = (response) => {
  console.log(response.data);
  return response.data;
};

const handleError = (err) => {
  return err.response;
};

export const makePayment = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${backendEndPoint}/payment`,
      payload
    );
    return handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

export const bookShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:3000/bookings",
      payload
    );
    return handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};
