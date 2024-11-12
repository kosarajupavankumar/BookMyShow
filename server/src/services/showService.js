import ShowModel from "../models/showModel.js";
import MovieModel from "../models/movieModel.js"; // Ensure movie model is registered

class ShowService {
  static async getAllShows({ movieId, theatreId, date }) {
    try {
      const query = {};
      if (movieId) query.movie = movieId;
      if (theatreId) query.theatre = theatreId;
      if (date) {
        const dateStart = new Date(date);
        const dateEnd = new Date(date);
        dateEnd.setDate(dateEnd.getDate() + 1);
        query.startTime = { $gte: dateStart, $lt: dateEnd };
      }

      const shows = await ShowModel.find(query)
        .populate("theatre")
        .populate("movie");

      console.log(`shows`, shows);
      return shows;
    } catch (error) {
      throw new Error("Error getting shows: " + error.message);
    }
  }

  static async getShowById(showId) {
    try {
      const show = await ShowModel.findById(showId);
      return show;
    } catch (error) {
      throw new Error("Error getting show: " + error.message);
    }
  }

  static async addShow(showData) {
    try {
      const show = new ShowModel(showData);
      await show.save();
      return show;
    } catch (error) {
      throw new Error("Error adding show: " + error.message);
    }
  }

  static async updateShow(showId, showData) {
    try {
      const show = await ShowModel.findByIdAndUpdate(showId, showData, {
        new: true,
      });
      return show;
    } catch (error) {
      throw new Error("Error updating show: " + error.message);
    }
  }

  static async deleteShow(showId) {
    try {
      const show = await ShowModel.findByIdAndDelete(showId);
      return show;
    } catch (error) {
      throw new Error("Error deleting show: " + error.message);
    }
  }

  static async getShowsByMovie(movieId) {
    try {
      const shows = await ShowModel.find({ movie: movieId }).populate("movie");
      return shows;
    } catch (error) {
      throw new Error("Error getting shows: " + error.message);
    }
  }

  static async getShowsByTheatre(theatreId) {
    try {
      const shows = await ShowModel.find({ theatre: theatreId }).populate(
        "theatre"
      );
      return shows;
    } catch (error) {
      throw new Error("Error getting shows: " + error.message);
    }
  }
}

export default ShowService;
