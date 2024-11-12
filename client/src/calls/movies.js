import { axiosInstance } from "./users";

const backendEndPoint = process.env.REACT_APP_BACKEND_URL;

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get(`${backendEndPoint}/movies`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(`${backendEndPoint}/movies/${id}`);
    console.log(`111 response`, response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
