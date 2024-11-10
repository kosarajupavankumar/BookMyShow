// src/controllers/movieController.js
import MovieService from "../services/movieService.js";

// Define controller functions

// Add a movie
export const addMovie = async (req, res) => {
  try {
    const movie = await MovieService.addMovie(req.body);
    res
      .status(201)
      .json({ sucess: true, data: movie, message: "Movie added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await MovieService.getAllMovies();
    res.status(200).send({
      sucess: true,
      data: movies,
      message: "Movies fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await MovieService.getMovieById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a movie
export const updateMovie = async (req, res) => {
  try {
    const movie = await MovieService.updateMovie(req.params.id, req.body);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a movie
export const deleteMovie = async (req, res) => {
  try {
    await MovieService.deleteMovie(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
