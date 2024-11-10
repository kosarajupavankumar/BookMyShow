import movieModel from "../models/movieModel.js";

class MovieService {
  static async getAllMovies() {
    try {
      const movies = await movieModel.find();
      return movies;
    } catch (error) {
      throw new Error("Error getting movies: " + error.message);
    }
  }

  static async getMovieById(movieId) {
    try {
      const movie = await movieModel.findById(movieId);
      return movie;
    } catch (error) {
      throw new Error("Error getting movie: " + error.message);
    }
  }

  static async addMovie(movieData) {
    try {
      const movie = new movieModel(movieData);
      await movie.save();
      return movie;
    } catch (error) {
      throw new Error("Error adding movie: " + error.message);
    }
  }

  static async updateMovie(movieId, movieData) {
    try {
      const movie = await movieModel.findByIdAndUpdate(movieId, movieData, {
        new: true,
      });
      return movie;
    } catch (error) {
      throw new Error("Error updating movie: " + error.message);
    }
  }

  static async deleteMovie(movieId) {
    try {
      const movie = await movieModel.findByIdAndDelete(movieId);
      return movie;
    } catch (error) {
      throw new Error("Error deleting movie: " + error.message);
    }
  }
}

export default MovieService;
